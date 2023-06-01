@restaurants.each do |restaurant|
    json.set! restaurant.id do
        json.extract! restaurant, :id, :name, :address, :city, :state, :zip_code, :cuisine, :food_rating, :service_rating, :ambience_rating, :value_rating, :phone, :website, :price, :created_at, :updated_at
    end
end