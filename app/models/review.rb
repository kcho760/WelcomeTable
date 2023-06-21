# == Schema Information
#
# Table name: reviews
#
#  id              :bigint           not null, primary key
#  title           :string
#  description     :text
#  food_rating     :float
#  service_rating  :float
#  ambience_rating :float
#  value_rating    :float
#  user_id         :bigint
#  restaurant_id   :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Review < ApplicationRecord
    belongs_to :user
    belongs_to :restaurant
  
    validates :title, presence: true
    validates :description, presence: true
    validates :food_rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
    validates :service_rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
    validates :ambience_rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
    validates :value_rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
    validates :user, presence: true
    validates :restaurant, presence: true
  end
  
