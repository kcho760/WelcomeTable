require "open-uri"
require 'aws-sdk-s3'

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Reservation.destroy_all
  Restaurant.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('reservations')
  ApplicationRecord.connection.reset_pk_sequence!('restaurants')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  puts "Creating Restaurants..."
  restaurants = []
  
  cuisine_types = []
  4.times do
    cuisine_types << Faker::Restaurant.type
  end
  cuisine_counter = 0
  26.times do
    restaurant_name = Faker::Restaurant.unique.name
    description = "#{restaurant_name} - #{Faker::Restaurant.description}"
    opening_time = Faker::Time.between_dates(from: Date.today, to: Date.today, period: :day).strftime('%l:%M %p')
    cuisine_type = cuisine_types[cuisine_counter]
    cuisine_counter = (cuisine_counter + 1) % cuisine_types.length
    restaurant = Restaurant.create!({
      name: restaurant_name,
      address: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      zip_code: Faker::Address.zip_code.to_i,
      cuisine: cuisine_type,
      food_rating: Faker::Number.between(from: 1, to: 5),
      service_rating: Faker::Number.between(from: 1, to: 5),
      ambience_rating: Faker::Number.between(from: 1, to: 5),
      value_rating: Faker::Number.between(from: 1, to: 5),
      phone: Faker::PhoneNumber.cell_phone,
      website: Faker::Internet.url,
      price: ['$','$$','$$$','$$$$'].sample,
      description: description,
      photoUrls: [], # Set an empty array for photoUrls to store the URLs
      cross_street: "#{Faker::Address.street_name}",
      hours_of_operation: "10:30 AM - 11:00 PM",
      dining_style: ['Casual', 'Casual Elegant', 'Fine Dining', 'Quick Bites', 'Barbecue', 'Bistro', 'Brasserie', 'Buffet', 'Cafe', 'Diner', 'Family Style', 'Fast Food', 'Gastropub', 'Pizzeria', 'Pub', 'Steakhouse', 'Sushi', 'Tapas/Small Plates', 'Vegetarian/Vegan'].sample,
      dress_code: ['Casual', 'Casual Elegant', 'Elegant', 'None'].sample,
      parking_details: [Faker::Address.street_address, 'None'].sample,
      public_transit: "#{Faker::Address.community} - #{Faker::Address.street_name} #{Faker::Number.between(from: 1, to: 10)} blocks away from #{Faker::Lorem.word} line, at #{Faker::Address.street_name} and #{Faker::Number.between(from: 1, to: 100)}th street",
      payment_options: ['AMEX', 'Discover', 'MasterCard', 'Visa', 'Pay with OpenTable'].sample(2) 
    })

    restaurants << restaurant
  end

  puts "pulling photos"
  # Create an instance of the S3 client
# Create an instance of the S3 client
  s3 = Aws::S3::Client.new(
    region: 'us-east-1',
    credentials: Aws::Credentials.new(
      Rails.application.credentials.aws[:access_key_id],
      Rails.application.credentials.aws[:secret_access_key]
    )
  )

  # Specify the bucket name and folder prefix
  bucket_name = 'opentableau-seeds'
  folder_prefix = 'photos_for_upload/'

  # Retrieve the list of objects (files) inside the folder
  response = s3.list_objects_v2(bucket: bucket_name, prefix: folder_prefix)

  # Extract the URLs of the objects
  photo_urls = response.contents.map { |object| object.key }

  # Shuffle the array of photo URLs randomly
  shuffled_urls = photo_urls.shuffle

  restaurants.each do |restaurant|
    puts restaurant.name
    # Assign the first 5 URLs from the shuffled array
    photo_urls = shuffled_urls.shift(5)
    puts photo_urls

    # Construct the full URLs by concatenating the bucket URL and the object key
    full_urls = photo_urls.map { |url| "https://#{bucket_name}.s3.amazonaws.com/#{url}" }

    # Clean the URLs by removing quotes and brackets
    clean_urls = full_urls.map { |url| url.gsub(/"|[\[\]]/, '') }

    # Append the clean URLs to the restaurant's photoUrls array
    restaurant.photoUrls.concat(clean_urls)
    restaurant.save

    puts restaurant.photoUrls

    if restaurant.photoUrls.empty?
      raise "Failed to populate photoUrls for restaurant: #{restaurant.name}"
    end
  end
  
  puts "photos done"
  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Done!"
end