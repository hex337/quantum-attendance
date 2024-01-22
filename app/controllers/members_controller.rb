class MembersController < ApplicationController
  MEETINGS_TO_SHOW_DEFAULT = 10
  MEMBERS_LIMIT_DEFAULT = 50
  before_action :set_member, only: [:show, :edit, :update, :destroy]

  skip_before_action :verify_authenticity_token

  # GET /members
  # GET /members.json
  def index
    show_inactive = params[:show_inactive] || false
    limit = params[:limit] || MEMBERS_LIMIT_DEFAULT
    query = params[:query] || nil
    members = []

    if not query.nil?
      active = params.fetch(:active, nil)

      if active.nil?
        active = true
      else
        active = active == "true"
      end

      members = Member.members_for_query(query, active)
    else
      if show_inactive && show_inactive == 'true'
        members = Member.order("last_name").for_school(current_school).where(is_active: false).includes(:belt)
      else
        members = Member.active.order("last_name").for_school(current_school).includes(:belt)
      end
    end

    @members = members
    @show_inactive = show_inactive

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @members.to_json(include: :belt) }
    end
  end

  # GET /members/1
  # GET /members/1.json
  def show
    if params.key?(:meetings_to_show)
      session[:meetings_to_show] = params[:meetings_to_show]
    end

    @meetings_to_show = session[:meetings_to_show] || MEETINGS_TO_SHOW_DEFAULT

    respond_to do |format|
      format.html { render :show }
      format.json { render json: @member }
    end
  end

  # GET /members/new
  def new
    @member = Member.new
    @member.is_active = true
  end

  # GET /members/1/edit
  def edit
  end

  # POST /members
  # POST /members.json
  def create
    @member = Member.new(member_params)

    respond_to do |format|
      if @member.save
        format.html { redirect_to @member, notice: 'Member was successfully created.' }
        format.json { render :show, status: :created, location: @member }
      else
        format.html { render :new }
        format.json { render json: @member.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /members/1
  # PATCH/PUT /members/1.json
  def update
    respond_to do |format|
      if @member.update(member_params)
        format.html { redirect_to @member, notice: 'Member was successfully updated.' }
        format.json { render :show, status: :ok, location: @member }
      else
        format.html { render :edit }
        format.json { render json: @member.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /members/1
  # DELETE /members/1.json
  def destroy
    @member.destroy
    respond_to do |format|
      format.html { redirect_to members_url, notice: 'Member was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_member
    @member = Member.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the allowed list through.
  def member_params
    params.require(:member).permit(:first_name, :last_name, :belt_id, :school_id, :comment, :is_active, :is_teacher, :is_quark, :is_kid, :is_teen)
  end
end
