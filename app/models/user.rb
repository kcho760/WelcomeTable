# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    validates :username, presence: true, length: {in: 3..30}, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email, presence: true, length: {in: 3..255}, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length {in: 6..255}, allow_nil: true

end
