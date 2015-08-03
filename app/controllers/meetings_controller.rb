class MeetingsController < ApplicationController
  before_action :set_meeting, only: [:show, :edit, :update, :destroy]

  # GET /meetings
  # GET /meetings.json
  def index
    @meetings = Meeting.all
  end

  # GET /meetings/1
  # GET /meetings/1.json
  def show
  end

  # GET /meetings/new
  def new
    @city = nil
    @instructors = Member.where(is_teacher: true)

    if params["city_name"]
      @city = School.find_by_name(params["city_name"].capitalize)
      
      if @city
        @instructors = Member.where(is_teacher: true, school: @city)
      end
    end

    @meeting = Meeting.new
  end

  # GET /meetings/1/edit
  def edit
  end

  # POST /meetings
  # POST /meetings.json
  def create
    @meeting = Meeting.new({
      meeting_type: MeetingType.find(meeting_params[:meeting_type]),
      met: DateTime.strptime(meeting_params[:date], '%m/%d/%Y %I:%M %p'), # 05/21/2015 10:07 pm
      instructor: Member.find(meeting_params[:instructor])
    })

    memberIds = meeting_params[:students].split(",")

    Member.find(memberIds).each do |member|
      mm = MeetingMember.new({
        meeting: @meeting,
        member: member,
        belt: member.belt,
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
    @meeting.meeting_members.each do |mm|
      mm.destroy()
    end

    memberIds = meeting_params[:students].split(",")

    Member.find(memberIds).each do |member|
      mm = MeetingMember.new({
        meeting: @meeting,
        member: member,
        belt: member.belt,
      })

      mm.save
    end

    @meeting.met = meeting_params[:met]
    @meeting.meeting_type = meeting_params[:meeting_type]
    #@meeting.instructor = meeting_params[:instructor]

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
      params.require(:meeting).permit(:meeting_type, :date, :instructor, :students)
    end
end
