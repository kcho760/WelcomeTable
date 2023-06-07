json.reservations do
    json.array!(@reservations) do |reservation|
      json.id reservation.id
      json.restaurant_id reservation.restaurant_id
      json.party_size reservation.party_size
      json.reservation_date reservation.reservation_date
      json.reservation_time reservation.reservation_time
      json.additional_info reservation.additional_info

      json.restaurant do
        json.id reservation.restaurant.id
        json.name reservation.restaurant.name
        # Include any other attributes of the associated restaurant
      end
    end
  end
  