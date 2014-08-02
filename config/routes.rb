SiliconStore::Application.routes.draw do
  get "home/index"

  devise_for :users, controllers: {
    registrations: :registrations,
    omniauth_callbacks: :omniauth_callbacks
  },
  path: :auth

  root "home#index"
end
