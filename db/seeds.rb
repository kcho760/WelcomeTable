# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


require "open-uri"
require 'aws-sdk-s3'

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )

    puts "Creating Restaurants..."
    restaurants = []

    20.times do
      restaurant_name = Faker::Restaurant.unique.name
      description = "#{restaurant_name} - #{Faker::Restaurant.description}"
      restaurant = Restaurant.create!({
        name: restaurant_name,
        address: Faker::Address.street_address,
        city: Faker::Address.city,
        state: Faker::Address.state,
        zip_code: Faker::Address.zip_code.to_i,
        cuisine: Faker::Restaurant.type,
        food_rating: Faker::Number.between(from: 1, to: 5),
        service_rating: Faker::Number.between(from: 1, to: 5),
        ambience_rating: Faker::Number.between(from: 1, to: 5),
        value_rating: Faker::Number.between(from: 1, to: 5),
        phone: Faker::PhoneNumber.cell_phone,
        website: Faker::Internet.url,
        price: ['$','$$','$$$','$$$$'].sample,
        description: description
      })
      restaurants << restaurant
    end

    puts "pulling photos"
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
    photo_urls = response.contents.map do |object|
      object.key # Object key is the file path within the bucket
    end
    
    # Shuffle the array of photo URLs randomly
    shuffled_urls = photo_urls.shuffle
    
    restaurants.each do |restaurant|
      # Assign the first URL from the shuffled array
      photo_url = shuffled_urls.shift
    
      # Extract the file name from the photo URL
      file_name = File.basename(photo_url)
    
      # Download the photo file from the S3 bucket
      photo_object = s3.get_object(bucket: bucket_name, key: photo_url)
      photo_file = photo_object.body
    
      # Attach the downloaded photo file to the restaurant
      restaurant.photos.attach(io: photo_file, filename: file_name)
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