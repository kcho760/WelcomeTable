class Api::SearchesController < ApplicationController
  def index
    cuisines = Restaurant.distinct.pluck(:cuisine)
    render json: { cuisines: cuisines }
  end

  def search
    search_term = params[:search_term]
    if search_term.present?
      restaurants = Restaurant.where('cuisine = ?', search_term)
    else
      restaurants = Restaurant.all
    end
    render json: { results: restaurants }
  end  
  
end
