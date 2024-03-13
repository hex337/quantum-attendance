Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :members

  resources :meeting_members

  resources :belts

  resources :roles

  resources :schools

  resources :meetings

  get 'test', controller: :meetings, action: :test, as: :test

  resources :meeting_types

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
end
