class Api::ReservationsController < ApplicationController
  # before_action :set_reservation, only: [:show, :update, :destroy]
  before_action :current_user, only: [:create, :update, :destroy, :index]
  before_action :set_time_zone

  def show
    @reservation = Reservation.find(params[:id])
    render json: { reservation: @reservation }
  end

  def index
    @reservations = current_user.reservations
    render json: { reservations: @reservations }
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
    start_datetime = Time.zone.parse(params[:startDateTime])
    end_datetime = Time.zone.parse(params[:endDateTime])
    restaurant_id = params[:restaurantId]
    party_size = params[:partySize].to_i
  
    # Get the restaurant
    restaurant = Restaurant.find(restaurant_id)
  
    # Initialize an array to store available reservations
    available_reservations = []
  
    # Set the minimum and maximum reservation times
    min_reservation_time = start_datetime.in_time_zone.change(hour: 10, min: 30, sec: 0)
    max_reservation_time = start_datetime.in_time_zone.change(hour: 23, min: 0, sec: 0)
  
    # Adjust the start and end times if they fall outside the allowed range
    start_datetime = [start_datetime, min_reservation_time].max
    end_datetime = [end_datetime, max_reservation_time].min
  
    # Ensure that the start time is rounded up to the next 15-minute interval if it's before 10:30 AM
    start_datetime = start_datetime.beginning_of_hour.change(min: (start_datetime.min / 15).ceil * 15) if start_datetime < min_reservation_time
  
    # Iterate over each 15-minute interval
    current_datetime = start_datetime
    while current_datetime < end_datetime
      # Check availability for the modified current interval using the helper method
      if validate_reservation_limit(current_datetime, restaurant)
        # If the current interval is available, add it to the available reservations array
        available_reservations << { reservationTime: current_datetime.strftime('%Y-%m-%d %I:%M:%S %p') }
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
    @reservation = Reservation.find(params[:id])
      if @reservation.update(reservation_params)
        render json: { reservation: @reservation }
      else
        render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
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

  def set_time_zone
    Time.zone = 'Eastern Time (US & Canada)'
  end

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end

  def reservation_params
    params.require(:reservation).permit(:party_size, :reservation_time, :reservation_date, :user_id, :restaurant_id, :additional_info)
  end

  def validate_reservation_limit(reservation_time, restaurant)
    buffer_time = 15.minutes
    reservation_start_time = reservation_time - buffer_time
    reservation_end_time = reservation_time + 1.hour
    reservation_end_time = reservation_end_time.change(min: reservation_end_time.min % 60)
  
    if reservation_end_time.min >= 60
      reservation_end_time += 60.minutes
      reservation_end_time = reservation_end_time.change(min: 0)
    end
  
    overlapping_reservations = restaurant.reservations.where(
      reservation_time: reservation_start_time...reservation_end_time
    )
  
    overlapping_reservations.count < 2
  end
  

end
