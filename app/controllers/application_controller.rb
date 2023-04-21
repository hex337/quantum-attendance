class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :check_school
  before_action :authenticate

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

  def authenticate
    if Rails.env.production?
      authenticate_or_request_with_http_basic do |username, password|
        username == ENV['AUTH_USER'] && password = ENV['AUTH_PWD']
      end
    end
  end
end
