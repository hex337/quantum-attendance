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

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
