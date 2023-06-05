json.array! @reservations do |reservation|
    json.extract! reservation, :id, :reservation_date, :reservation_time, :party_size, :additional_info
    
    json.user do
      json.extract! reservation.user, :id, :name, :email
    end
    
    json.restaurant do
      json.extract! reservation.restaurant, :id, :name, :address
    end
  end
  