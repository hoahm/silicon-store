SiliconStore::Application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get "home/index"

  devise_for :users, controllers: {
    registrations: :registrations,
    passwords: :passwords,
    omniauth_callbacks: :omniauth_callbacks
  },
  path: :auth

  resources :products
  resources :categories
  resources :vendors

  root "home#index"
end