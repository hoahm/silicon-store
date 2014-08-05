SiliconStore::Application.routes.draw do
  faye_server '/faye', :timeout => 25 do
    map '/category' => RealtimeCategoryController
    map default: :block
  end

  mount Ckeditor::Engine => '/ckeditor'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get "home/index"

  devise_for :users, controllers: {
    registrations: :registrations,
    omniauth_callbacks: :omniauth_callbacks
  },
  path: :auth

  resources :products
  resources :categories

  root "home#index"
end