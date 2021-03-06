Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "user#dashboard"

  resources :company, only: [:show]
  resources :project, only: [:show]
end
