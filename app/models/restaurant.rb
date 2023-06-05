# == Schema Information
#
# Table name: restaurants
#
#  id                 :bigint           not null, primary key
#  name               :string           not null
#  address            :string           not null
#  city               :string           not null
#  state              :string           not null
#  zip_code           :bigint           not null
#  cuisine            :string           not null
#  food_rating        :float
#  service_rating     :float
#  ambience_rating    :float
#  value_rating       :float
#  phone              :string
#  website            :string
#  price              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  description        :string
#  photoUrls          :string           default([]), is an Array
#  cross_street       :string
#  hours_of_operation :string
#  dining_style       :string
#  dress_code         :string
#  parking_details    :string
#  public_transit     :string
#  payment_options    :string
#
class Restaurant < ApplicationRecord
    validates :name, :address, :city, :state, :zip_code, :cuisine, presence: true
    validates :name, length: { maximum: 50 }
    validates :zip_code, numericality: { only_integer: true }
    attribute :photoUrls, :string, array: true, default: []
    # validates :phone, format: { with: /\A\d{3}-\d{3}-\d{4}\z/, message: "should be in the format xxx-xxx-xxxx" }, allow_blank: true

    # has_one_attached :photo
    
    has_many_attached :photosUrls
    # has_many :reviews
end
