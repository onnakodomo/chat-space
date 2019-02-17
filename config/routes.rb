Rails.application.routes.draw do
  devise_for :users
  root                      'messages#index'
  get   'messages'       => 'messages#index'
  get   'users/:id/edit' => 'users#edit'
  patch 'users/:id'      => 'user#update'
end
