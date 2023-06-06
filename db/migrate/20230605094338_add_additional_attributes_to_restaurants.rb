class AddAdditionalAttributesToRestaurants < ActiveRecord::Migration[7.0]
  def change
    add_column :restaurants, :cross_street, :string
    add_column :restaurants, :hours_of_operation, :string
    add_column :restaurants, :dining_style, :string
    add_column :restaurants, :dress_code, :string
    add_column :restaurants, :parking_details, :string
    add_column :restaurants, :public_transit, :string
    add_column :restaurants, :payment_options, :string
  end
end
