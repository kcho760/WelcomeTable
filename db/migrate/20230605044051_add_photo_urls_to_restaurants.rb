class AddPhotoUrlsToRestaurants < ActiveRecord::Migration[7.0]
  def change
    add_column :restaurants, :photoUrls, :text, array: true, default: []
  end
end
