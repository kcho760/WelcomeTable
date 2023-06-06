class ChangePhotoUrlsTypeInRestaurants < ActiveRecord::Migration[6.0]
  def up
    change_column :restaurants, :photoUrls, :string, array: true, default: []
  end

  def down
    change_column :restaurants, :photoUrls, :text, array: false, default: ''
  end
end
