class Api::SearchController < ApplicationController
  def search
    search_term = params[:search_term]

    # Example: Searching for restaurants with matching cuisine
    restaurants = Restaurant.where('cuisine ILIKE ?', "%#{search_term}%")

    render json: { results: restaurants }
  end

  def search_cuisines
    cuisines = Restaurant.distinct.pluck(:cuisine)
    render json: { cuisines: cuisines }
  end
end
