class Api::RestaurantsController < ApplicationController
    def show
        @restaurant = Restaurant.find(params[:id])
        render 'api/restaurants/show'
    end

    def index
        @restaurants = Restaurant.all
        render 'api/restaurants/index'
    end

    def restaurant_params
        params.require(:restaurant).permit(:id, :name, :cuisine)
    end
end