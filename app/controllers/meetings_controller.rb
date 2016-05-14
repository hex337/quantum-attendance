class MeetingsController < ApplicationController
  before_action :set_meeting, only: [:show, :edit, :update, :destroy]

  # GET /meetings
  # GET /meetings.json
  def index
    @meetings = Meeting.for_school(@_current_school).limit(50)
  end

  # GET /meetings/1
  # GET /meetings/1.json
  def show
  end

  # GET /meetings/new
  def new
    @city = nil
    @instructors = Member.where(is_teacher: true).order(:first_name)

    if current_school
      @instructors = Member.where(is_teacher: true, school: current_school).order(:first_name)
    end

    @meeting = Meeting.new
  end

  # GET /meetings/1/edit
  def edit
    @meeting[:met] = @meeting[:met].in_time_zone('America/Los_Angeles')
  end

  # POST /meetings
  # POST /meetings.json
  def create
    dateFormats = ['%m/%d/%Y %I:%M %p', '%Y-%m-%dT%I:%M']
    # 2016-05-10T10:10 or 05/21/2015 10:07 pm
    dateStr = meeting_params[:date]
    parsedDate = nil

    dateFormats.each do |format|
      parsedDate ||= DateTime.strptime(dateStr, format) rescue nil
    end

    @meeting = Meeting.new({
      meeting_type: MeetingType.find(meeting_params[:meeting_type]),
      met: parsedDate,
      comment: meeting_params[:comment]
    })

    memberIds = meeting_params[:students].split(",")
    studentRole = Role.find_by_name("Student")
    instructorRole = Role.find_by_name("Teacher")

    instructor = Member.find(meeting_params[:instructor])
    instMeetingMem = MeetingMember.new({
      meeting: @meeting,
      member: instructor,
      belt: instructor.belt,
      role: instructorRole
    })

    instMeetingMem.save

    Member.find(memberIds).each do |member|
      mm = MeetingMember.new({
        meeting: @meeting,
        member: member,
        belt: member.belt,
        role: studentRole,
      })

      mm.save
    end

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
    MeetingMember.delete(@meeting.meeting_members.collect {|mm| mm.id})
    instructor = Member.find_by_id(meeting_params[:instructor])

    studentRole = Role.find_by_name("Student")
    instructorRole = Role.find_by_name("Teacher")
    memberIds = meeting_params[:students].split(",")

    instMeetingMem = MeetingMember.new({
      meeting: @meeting,
      member: instructor,
      belt: instructor.belt,
      role: instructorRole,
    })

    instMeetingMem.save

    Member.find(memberIds).each do |member|
      mm = MeetingMember.new({
        meeting: @meeting,
        member: member,
        belt: member.belt,
        role: studentRole,
      })

      mm.save
    end

    @meeting.met = meeting_params[:date]
    @meeting.meeting_type_id = meeting_params[:meeting_type]
    @meeting.comment = meeting_params[:comment]
    instructor = meeting_params[:instructor]

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
