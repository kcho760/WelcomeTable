class Api::RestaurantsController < ApplicationController
    def show
        @restaurant = Restaurant.find(params[:id])
        render 'api/restaurants/show'
    end

    def index
        @restaurants = Restaurant.all
        render 'api/restaurants/index'
    end

    def daily_reservations
        restaurant_id = params[:id]
        today = Time.zone.now.beginning_of_day..Time.zone.now.end_of_day
        todays_reservations = Reservation.where(restaurant_id: restaurant_id, created_at: today).count
      
        render json: { reservationCount: todays_reservations }
      end
      


    def restaurant_params
        params.require(:restaurant).permit(:id, :name, :cuisine)
    end
end