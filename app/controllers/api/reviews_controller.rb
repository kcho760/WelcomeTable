class Api::ReviewsController < ApplicationController
  before_action :get_review, only: [:show, :update, :destroy]

  def index
    @reviews = Review.all
    render json: @reviews
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render json: @review, status: :created
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @review
  end

  def update
    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @review.destroy
    render json: { message: 'Review successfully deleted.' }
  end

  def retrieve_by_restaurant_id
    @restaurant = Restaurant.find(params[:restaurant_id])
    @reviews = @restaurant.reviews
    render json: @reviews
  end

  def user_reviews
    @user = User.find(params[:user_id])
    @reviews = @user.reviews
    render json: @reviews
  end 

  private

  def get_review
    begin
      @review = Review.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Review not found" }, status: :not_found
    end
  end
  

  def review_params
    params.require(:review).permit(:description, :food_rating, :service_rating, :ambience_rating, :value_rating, :user_id, :restaurant_id)
  end
end
