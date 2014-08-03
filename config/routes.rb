SiliconStore::Application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get "home/index"

  devise_for :users, controllers: {
    registrations: :registrations,
    omniauth_callbacks: :omniauth_callbacks
  },
  path: :auth

  root "home#index"
end
