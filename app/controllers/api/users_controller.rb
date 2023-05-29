class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
  
    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def check_email
    email = params[:email]
    @user = User.find_by(email: email)
  
    if @user
      render json: { email: email, exists: true }
    else
      render json: { email: email, exists: false }
    end
  end
  
  
  private

  def user_params
    params.require(:user).permit(:email, :username , :password)
  end
end
