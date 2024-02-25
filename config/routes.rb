Rails.application.routes.draw do
  resources :members

  resources :meeting_members

  resources :belts

  resources :roles

  resources :schools

  resources :meetings

  get 'test', controller: :meetings, action: :test, as: :test

  resources :meeting_types

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  get 'home/reports' => 'home#reports', as: :reports
  
  get 'home/poor_attendance' => 'home#poor_attendance', as: :poor_attendance
  get 'home/slacker_report' => 'home#slacker_report', as: :slacker_report
  get 'home/classes_per_student' => 'home#classes_per_student', as: :classes_per_student
  get 'home/people_per_class' => 'home#people_per_class', as: :people_per_class

  get 'attendance/(for/:school)', controller: :meetings, action: :new, as: :attendance

  get 'dashboard/(for/:school)', controller: :home, action: :dashboard, as: :dashboard

  get 'home/attendance', controller: :home, action: :attendance_for_all_time
  get 'home/attendance/:year', controller: :home, action: :attendance_for_year
  get 'home/attendance/:year/:month', controller: :home, action: :attendance_for_month

  resources :classes, defaults: {format: :json}
end
