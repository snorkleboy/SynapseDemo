Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do

    match 'users', to: 'synapse_users#index', via: [:get]
  end

  root 'static_pages#root'
end
