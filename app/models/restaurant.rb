# == Schema Information
#
# Table name: restaurants
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  address         :string           not null
#  city            :string           not null
#  state           :string           not null
#  zip_code        :bigint           not null
#  cuisine         :string           not null
#  food_rating     :float
#  service_rating  :float
#  ambience_rating :float
#  value_rating    :float
#  phone           :string
#  website         :string
#  price           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  description     :string
#
class Restaurant < ApplicationRecord
    validates :name, :address, :city, :state, :zip_code, :cuisine, presence: true
    validates :name, length: { maximum: 50 }
    validates :zip_code, numericality: { only_integer: true }
    # validates :phone, format: { with: /\A\d{3}-\d{3}-\d{4}\z/, message: "should be in the format xxx-xxx-xxxx" }, allow_blank: true

    # has_many :reviews
end
