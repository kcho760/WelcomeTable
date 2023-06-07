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

  def available
    # Retrieve the parameters
    start_datetime = DateTime.parse(params[:startDateTime])
    end_datetime = DateTime.parse(params[:endDateTime])
    restaurant_id = params[:restaurantId]
    party_size = params[:partySize].to_i
  
    # Get the restaurant
    restaurant = Restaurant.find(restaurant_id)
  
    # Initialize an array to store available reservations
    available_reservations = []
  
    # Iterate over each 15-minute interval
    current_datetime = start_datetime
    while current_datetime < end_datetime
      # Check availability for the current interval using the helper method
      if validate_reservation_limit(current_datetime, restaurant)
        # If the current interval is available, add it to the available reservations array
        available_reservations << { reservationTime: current_datetime }
      end
  
      # Move to the next 15-minute interval
      current_datetime += 15.minutes
  
      # Handle minutes exceeding 59
      if current_datetime.min >= 60
        current_datetime += 1.hour
        current_datetime = current_datetime.change(min: 0)
      end
    end
  
    if available_reservations.empty?
      render json: { message: 'No available reservations within the specified time range' }
    else
      render json: { availableReservations: available_reservations }
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
    @reservation = Reservation.find_by(id: params[:id])

    if @reservation && @reservation.user_id == current_user.id
      @reservation.destroy
      render json: { message: "Reservation successfully deleted" }
    else
      render json: { error: "Reservation not found or unauthorized" }, status: :not_found
    end
  end

  private

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end

  def reservation_params
    params.require(:reservation).permit(:party_size, :reservation_time, :reservation_date, :user_id, :restaurant_id, :additional_info)
  end

  def validate_reservation_limit(reservation_time, restaurant)
    buffer_time = 15.minutes
    reservation_start_time = reservation_time - buffer_time
    reservation_end_time = reservation_time + 30.minutes

    if reservation_end_time.min >= 60
      reservation_end_time += 60.minutes
      reservation_end_time = reservation_end_time.change(min: 0)
    end

    overlapping_reservations = restaurant.reservations.where(
      reservation_time: reservation_start_time...reservation_end_time
    )

    overlapping_reservations.count <= 1
  end

end
