class MeetingsController < ApplicationController
  before_action :set_meeting, only: [:show, :edit, :update, :destroy]

  def test
    @class = Meeting.new

    respond_to do |format|
      format.html { render :test, {layout: "mobile"} }
    end
  end

  # GET /meetings
  # GET /meetings.json
  def index
    @meetings = Meeting.for_school(@_current_school).paginate(page: params[:page], per_page: 50)
  end

  # GET /meetings/1
  # GET /meetings/1.json
  def show
  end

  # GET /meetings/new
  def new
    @instructors = Member.for_school(@_current_school).active.where(is_teacher: true).order(:first_name)
    @inst_for_select = @instructors.collect{|inst| [inst.full_name, inst.id]}
    @members = Member.for_school(@_current_school)
    @meeting = Meeting.new
  end

  # GET /meetings/1/edit
  def edit
    @instructors = Member.for_school(@_current_school).active.where(is_teacher: true).order(:first_name)
    @inst_for_select = @instructors.collect{|inst| [inst.full_name, inst.id]}
    @students = @meeting.members.collect{|mem| mem}.delete_if{|mem| mem.id == @meeting.instructor.id}
    @meeting[:met] = @meeting[:met].in_time_zone('America/Los_Angeles')
  end

  # POST /meetings
  # POST /meetings.json
  def create
    dateFormats = ['%m/%d/%Y %I:%M %p %Z', '%Y-%m-%dT%H:%M %Z']
    # 2016-05-10T10:10 or 05/21/2015 10:07 pm
    # 2016-10-18T00:24
    dateStr = meeting_params[:date] + " " + Time.zone.now.strftime('%Z')
    logger.info("dateStr: " + dateStr)
    parsedDate = nil

    dateFormats.each do |format|
      parsedDate ||= DateTime.strptime(dateStr, format) rescue nil
    end

    if parsedDate.nil?
      logger.error("No date found for input date: " + dateStr)
      raise ActiveRecord::RecordNotFound()
    end

    @meeting = Meeting.new({
      meeting_type: MeetingType.find(meeting_params[:meeting_type]),
      met: parsedDate,
      school_id: @_current_school.id,
      comment: meeting_params[:comment]
    })

    memberIds = meeting_params[:students].split(",")
    studentRole = Role.student_role
    instructorRole = Role.teacher_role

    instructor = Member.find(meeting_params[:instructor])
    instMeetingMem = MeetingMember.new({
      meeting: @meeting,
      member: instructor,
      belt: instructor.belt,
      role: instructorRole
    })

    instMeetingMem.save
    events = []

    Member.find(memberIds).each do |member|
      mm = MeetingMember.new({
        meeting: @meeting,
        member: member,
        belt: member.belt,
        role: studentRole,
      })

      mm.save
      events << mm.to_keen_props
    end

    Keen.publish_batch(:attendance => events)

    respond_to do |format|
      if @meeting.save
        format.html { redirect_to meetings_path(), notice: 'Meeting was successfully created.' }
        format.json { render :show, status: :created, location: @meeting }
      else
        format.html { render :new }
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /meetings/1
  # PATCH/PUT /meetings/1.json
  def update
    instructorId = @meeting.instructor.id
    currentMemberIds = @meeting.meeting_members.collect{|mm| mm.member_id}
    currentMemberIds.delete(instructorId)
    studentRole = Role.student_role
    instructorRole = Role.teacher_role
    memberIds = meeting_params[:students].split(",").collect{|id| id.to_i}

    membersToDelete = currentMemberIds - memberIds
    membersToAdd = memberIds - currentMemberIds

    mmids = @meeting.meeting_members.select{|mm| membersToDelete.include?(mm.member_id)}.collect{|mm| mm.id}
    MeetingMember.delete(mmids) unless mmids.empty?

    if meeting_params[:instructor].to_i != instructorId
      instructor = Member.find_by_id(meeting_params[:instructor])
      instMeetingMem = MeetingMember.new({
        meeting: @meeting,
        member: instructor,
        belt: instructor.belt,
        role: instructorRole,
      })

      instMeetingMem.save
    end

    if !membersToAdd.empty?
      events = []
      Member.find(membersToAdd).each do |member|
        mm = MeetingMember.new({
          meeting: @meeting,
          member: member,
          belt: member.belt,
          role: studentRole,
        })

        mm.save
        events << mm.to_keen_props
      end

      Keen.publish_batch(:attendance => events)
    end

    @meeting.met = meeting_params[:date]
    @meeting.meeting_type_id = meeting_params[:meeting_type]
    @meeting.comment = meeting_params[:comment]

    respond_to do |format|
      if @meeting.save()
        format.html { redirect_to @meeting, notice: 'Meeting was successfully updated.' }
        format.json { render :show, status: :ok, location: @meeting }
      else
        format.html { render :edit }
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /meetings/1
  # DELETE /meetings/1.json
  def destroy
    @meeting.destroy
    respond_to do |format|
      format.html { redirect_to meetings_url, notice: 'Meeting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def meeting_params
      params.require(:meeting).permit(:meeting_type, :date, :instructor, :students, :comment)
    end
end
