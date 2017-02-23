Rails.application.routes.draw do
  devise_for :uses
 root 'home#index'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount Ckeditor::Engine => '/ckeditor'
  get 'home/index'
  post '/merge' => 'home#merge'
 
  post '/save' => 'home#save', as: 'save'
 


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
