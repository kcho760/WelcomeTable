Rails.application.routes.draw do
  # Root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    # Custom route for fetching all cuisines
    get 'cuisines', to: 'searches#index'

    # Custom route for retrieving reviews by restaurant ID
    get 'restaurant/:restaurant_id/reviews', to: 'reviews#retrieve_by_restaurant_id'

    # Route for checking email availability
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

    resources :reviews, only: [:create, :update, :destroy]

    # Add a route for fetching user data by user ID
    resources :users, only: [] do
      member do
        get 'fetch_data', to: 'users#fetch_data'
      end
    end

    # Custom route for getting search results
    get '/searches/:search_term', to: 'searches#search', constraints: { search_term: /.*/ }
    get '/searches', to: 'searches#search'    
  end

  # Catch-all route for frontend handling
  get '*path', to: "static_pages#frontend_index"
end
