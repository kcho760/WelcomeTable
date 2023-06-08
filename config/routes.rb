Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    get 'search/:search_term', to: 'search#search'
    get 'cuisines', to: 'search#index'  # Add this line for fetching all cuisines
    post 'users/check_email', to: 'users#check_email'
    resources :users, only: :create do
      resources :reservations, only: :index
    end
    resource :session, only: [:show, :create, :destroy]
    resources :restaurants, only: [:show, :index, :update]
    resources :reservations, only: [:create, :show, :update, :destroy] do
      collection do
        post 'available', to: 'reservations#available'
      end
    end  
  end
  get '*path', to: "static_pages#frontend_index"
end
