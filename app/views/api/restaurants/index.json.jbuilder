@restaurants.each do |restaurant|
    json.set! restaurant.id do
      json.extract! restaurant, :id, :name, :address, :city, :state, :zip_code, :cuisine, :food_rating, :service_rating, :ambience_rating, :value_rating, :phone, :website, :price, :created_at, :updated_at, :description, :photoUrls, :cross_street, :hours_of_operation, :dining_style, :dress_code, :parking_details, :public_transit, :payment_options
    end
  end
  