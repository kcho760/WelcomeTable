class ReservationsController < ApplicationController
    def create
      reservation = Reservation.new(reservation_params)
  
      if reservation.save
        render json: { message: 'Reservation created successfully' }
      else
        render json: { errors: reservation.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def reservation_params
      params.require(:reservation).permit(:user_id, :restaurant_id, :reservation_date, :reservation_time, :party_size, :additional_info)
    end
  end
  