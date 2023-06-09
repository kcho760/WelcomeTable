class Api::SearchesController < ApplicationController
  def search
    search_term = params[:search_term]
    restaurants = Restaurant.where('cuisine = ?', search_term)
    render json: { results: restaurants }
    # debugger
  end


  def index
    @cuisines = Restaurant.distinct.pluck(:cuisine)
    render json: { cuisines: @cuisines }
  end
end
