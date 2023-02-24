Rails.application.routes.draw do
  root to: 'dashboard#show'
   match '*path', to: 'dashboard#show', via: :get, constraints: ->(request) { !request.path.start_with?('/rails') && !request.path.start_with?('/api') }
end
