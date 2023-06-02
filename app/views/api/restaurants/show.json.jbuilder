json.extract! @restaurant, :id, :name, :address, :city, :state, :zip_code, :cuisine, :food_rating, :service_rating, :ambience_rating, :value_rating, :phone, :website, :price, :created_at, :updated_at, :description
json.photoUrl @restaurant.photos.attached? ? @restaurant.photos.first.url : nil
