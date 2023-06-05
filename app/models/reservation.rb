# == Schema Information
#
# Table name: reservations
#
#  id               :bigint           not null, primary key
#  user_id          :bigint           not null
#  restaurant_id    :bigint           not null
#  reservation_date :date             not null
#  reservation_time :time             not null
#  party_size       :integer          not null
#  additional_info  :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Reservation < ApplicationRecord
    validates :reservation_date, presence: true
    validates :reservation_time, presence: true
    validates :party_size, presence: true, numericality: { greater_than: 0 }
    validates :user_id, presence: true
    validates :restaurant_id, presence: true

    belongs_to :user
    belongs_to :restaurant
end
