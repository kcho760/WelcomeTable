class ApplicationController < ActionController::API

    include ActionController::RequestForgeryProtection

    protect_from_forgery with: :exception

    before_action :snake_case_params
    before_action :attach_authenticity_token

    def test
        render json: {message: ["Hello from Rails"]}
    end

    private

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    def snake_case_params
        params.deep_transform_keys(&:underscore)
    end

end
