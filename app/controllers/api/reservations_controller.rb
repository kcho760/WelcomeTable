class Api::ReservationsController < ApplicationController
    # before_action :set_reservation, only: [:show, :update, :destroy]
    before_action :current_user, only: [:create, :update, :destroy]
  
    def show
      @reservation = Reservation.find(params[:id])
      render json: { reservation: @reservation }
    end
  
    def create
      @reservation = Reservation.new(reservation_params)
      if @reservation.save
        render json: { reservation: @reservation }, status: :created
      else
        render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
      end
      
    end
  
    def update
      if @reservation.user_id == current_user.id
        if @reservation.update(reservation_params)
          render json: { message: 'Reservation updated successfully' }
        else
          render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  
    def destroy
      if @reservation.user_id == current_user.id
        @reservation.destroy
        render json: { message: 'Reservation deleted successfully' }
      else
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  
    private
  
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end
  
    def reservation_params
      params.require(:reservation).permit(:party_size, :reservation_time, :reservation_date, :user_id, :restaurant_id, :additional_info)
    end
    
         
  end
  