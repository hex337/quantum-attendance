class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :check_school

  def current_school
    @_current_school ||= session[:current_school_id] && School.find(session[:current_school_id])
  end

  def check_school
    if params[:school]
      if params[:school] == "none"
        session[:current_school_id] = nil
      else
        school = School.find_by_slug(params[:school])

        if school
          session[:current_school_id] = school.id
        end
      end
    end

    current_school
  end
end
