class CreateReservations < ActiveRecord::Migration[6.1]
  def change
    create_table :reservations do |t|
      t.references :user, foreign_key: true, null: false
      t.references :restaurant, foreign_key: true, null: false
      t.date :reservation_date, null: false
      t.time :reservation_time, null: false
      t.integer :party_size, null: false
      t.string :additional_info
      t.timestamps
    end
  end
end
