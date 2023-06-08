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
    validate :validate_reservation_limit

    belongs_to :user
    belongs_to :restaurant

    private
    #checks if selected reservation button is validated
    def validate_reservation_limit 
      buffer_time = 15.minutes
      reservation_start_time = reservation_time - buffer_time
      reservation_end_time = reservation_time + 30.minutes
    
      if reservation_end_time.min >= 60
        reservation_end_time += 60.minutes
        reservation_end_time = reservation_end_time.change(min: 0)
      end
    
      overlapping_reservations = self.restaurant.reservations.where(
        reservation_time: reservation_start_time...reservation_end_time
      )
    
      if overlapping_reservations.count > 1
        return false
      end
    
      if reservation_start_time < Time.parse('10:30 AM') || reservation_end_time > Time.parse('11:00 PM')
        return false
      end
    end
    
    
    
end
# else return available