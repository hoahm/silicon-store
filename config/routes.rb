SiliconStore::Application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get "home/index"

  devise_for :users, controllers: {
    registrations: :registrations
  }

  root "home#index"
end
