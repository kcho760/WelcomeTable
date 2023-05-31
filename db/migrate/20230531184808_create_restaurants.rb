class CreateRestaurants < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.bigint :zip_code, null: false
      t.string :cuisine, null: false
      t.float :food_rating
      t.float :service_rating
      t.float :ambience_rating
      t.float :value_rating
      t.string :phone
      t.string :website
      t.string :price
      t.timestamps
    end
    add_index :restaurants, :name
    add_index :restaurants, :cuisine
  end
end
