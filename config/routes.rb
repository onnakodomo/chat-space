Rails.application.routes.draw do
  devise_for :users
  root                      'messages#index'
  resources :messages, only: [:index]
  resources :users,    only: [:edit, :update]
  resources :groups,   only: [:new, :create]
end
