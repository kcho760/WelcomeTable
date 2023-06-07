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
    has_secure_password
    before_validation :ensure_session_token

    validates :username, presence: true, length: { within: 3..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
    validates :email, presence: true, length: { within: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { within: 6..255 }, allow_nil: true
    has_many :reservations

    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      user&.authenticate(password)
    end
    


    def reset_session_token!
        self.update!(session_token: generate_unique_session_token)
        self.session_token
    end


    private

    def generate_unique_session_token
        loop do
            session_token = SecureRandom.base64
            return session_token unless User.exists?(session_token: session_token)
          end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end



end
