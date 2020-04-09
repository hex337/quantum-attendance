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
    @students = @meeting.students
    @assistants = @meeting.assistants
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
    assistIds = meeting_params[:assistants].split(",")
    student_role = Role.student_role
    instructor_role = Role.teacher_role
    assistant_role = Role.assistant_role

    # Create an array of tuples, role to member to then add.
    students = Member.find(memberIds)
    assistants = Member.find(assistIds)
    instructor = Member.find(meeting_params[:instructor])

    mmembs = students.collect {|mem| [student_role, mem]} + assistants.collect {|mem| [assistant_role, mem]} + [instructor].collect {|mem| [instructor_role, mem]}

    mmembs.each do |mmem|
      puts mmem.inspect
      role, member = mmem
      mm = MeetingMember.new({
        meeting: @meeting,
        member: member,
        belt: member.belt,
        role: role,
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
    instructor_id = @meeting.instructor.is_a?(Member) ? @meeting.instructor.id : nil
    student_role = Role.student_role
    instructor_role = Role.teacher_role
    assistant_role = Role.assistant_role

    currentStudentIds = []
    currentAssistantIds = []

    @meeting.meeting_members.each do |mm|
      case mm.role_id
      when student_role.id
        currentStudentIds << mm.member_id
      when assistant_role.id
        currentAssistantIds << mm.member_id
      end
    end

    currentMemberIds = @meeting.meeting_members.collect{|mm| mm.member_id}
    currentMemberIds.delete(instructor_id) if instructor_id

    studentIds = meeting_params[:students].split(",").collect{|id| id.to_i}
    assistantIds = meeting_params[:assistants].split(",").collect{|id| id.to_i}

    studentsToDelete = currentStudentIds - studentIds
    studentsToAdd = studentIds - currentStudentIds

    assistantsToDelete = currentAssistantIds - assistantIds
    assistantsToAdd = assistantIds - currentAssistantIds

    # Grab the rows we want to delete, then delete 'em
    mmStudentIds = @meeting.meeting_members.select{|mm| studentsToDelete.include?(mm.member_id)}.collect{|mm| mm.id}
    mmAssistantIds = @meeting.meeting_members.select{|mm| assistantsToDelete.include?(mm.member_id)}.collect{|mm| mm.id}
    MeetingMember.delete(mmStudentIds) unless mmStudentIds.empty?
    MeetingMember.delete(mmAssistantIds) unless mmAssistantIds.empty?

    if meeting_params[:instructor].to_i != instructor_id
      if instructor_id
        # delete old instructor
        mm_instructor_id = @meeting.meeting_members.select{|mm| mm.member_id == instructor_id}.collect{|mm| mm.id}
        MeetingMember.delete(mm_instructor_id)
      end

      # add new one
      instructor = Member.find_by_id(meeting_params[:instructor])
      instMeetingMem = MeetingMember.new({
        meeting: @meeting,
        member: instructor,
        belt: instructor.belt,
        role: instructor_role,
      })

      instMeetingMem.save
    end

    mmembs = []

    unless studentsToAdd.empty?
      Member.find(studentsToAdd).each do |mem|
        mmembs << [student_role, mem]
      end
    end

    unless assistantsToAdd.empty?
      Member.find(assistantsToAdd).each do |mem|
        mmembs << [assistant_role, mem]
      end
    end

    mmembs.each do |mmem|
      role, member = mmem

      mm = MeetingMember.new({
        meeting: @meeting,
        member: member,
        belt: member.belt,
        role: role,
      })

      mm.save
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
      params.require(:meeting).permit(:meeting_type, :date, :instructor, :assistants, :students, :comment)
    end
end
