class Api::SearchesController < ApplicationController
  def index
    cuisines = Restaurant.distinct.pluck(:cuisine)
    render json: { cuisines: cuisines }
  end

  def search
    search_term = params[:search_term]
    restaurants = search_term.present? ? Restaurant.where('cuisine = ?', search_term) : Restaurant.all
    render json: { results: restaurants }
  end
  
end
