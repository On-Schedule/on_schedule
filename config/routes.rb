Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: 'json' } do
    scope module: :v1, path: '/v1' do
      devise_scope :user do
        delete 'user', to: '/devise/sessions#destroy'
      end

      resource :user, only: [:show]
      resources :project_templates, only: [:index, :create]
      resource :company, only: [] do
        resources :users, only: [:index]
      end
      resources :projects, only: [:create, :show] do
        resources :tasks, only: [:index, :create, :update, :destroy]
      end
      resources :to_dos, only: [:create, :update]
      get "analytics/week_overview", to: "analytics#week_overview"
    end
  end

  mount ActionCable.server => '/cable'
  root to: 'dashboard#show'
  match '*path', to: 'dashboard#show', via: :get, constraints: ->(request) { !request.path.start_with?('/rails') && !request.path.start_with?('/api') }
end
