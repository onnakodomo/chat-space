Rails.application.routes.draw do
  devise_for :users
  root                      'groups#index'
  resources :users,    only: [:edit, :update]
  resources :groups do
    resources :messages
  end
end
