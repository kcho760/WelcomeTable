class Api::SearchController < ApplicationController
  def search
    search_term = params[:search_term]
    restaurants = Restaurant.where('cuisine = ?', search_term)
    render json: { results: restaurants }
  end  
  
  def index
    @cuisines = Restaurant.distinct.pluck(:cuisine)
  end
end
