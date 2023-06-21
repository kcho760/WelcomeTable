class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :description
      t.float :food_rating
      t.float :service_rating
      t.float :ambience_rating
      t.float :value_rating
      t.references :user, foreign_key: true
      t.references :restaurant, foreign_key: true
      t.timestamps
    end
  end
end
