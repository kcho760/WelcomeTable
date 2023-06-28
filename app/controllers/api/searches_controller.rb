class Api::SearchesController < ApplicationController
  def index
    cuisines = Restaurant.distinct.pluck(:cuisine)
    render json: { cuisines: cuisines }
  end

  def search
    search_term = params[:search_term]
    restaurants = Restaurant.where('cuisine = ?', search_term)
    render json: { results: restaurants }
  end
end
