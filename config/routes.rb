Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: 'json' } do
    scope module: :v1, path: '/v1' do
      resource :user, only: [:show]
      resources :projects, only: [:create, :show]
    end
  end

  root to: 'dashboard#show'
  match '*path', to: 'dashboard#show', via: :get, constraints: ->(request) { !request.path.start_with?('/rails') && !request.path.start_with?('/api') }
end
