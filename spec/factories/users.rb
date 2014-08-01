# Read about factories at https://github.com/thoughtbot/factory_girl
require "faker"

FactoryGirl.define do
  factory :user do |f|
    f.email { Faker::Internet.safe_email }
    f.password "12345678"
    f.password_confirmation "12345678"
    f.first_name { Faker::Name.first_name }
    f.last_name { Faker::Name.last_name }
    f.date_of_birth (10..30).to_a.sample.year.ago
    f.mobile { Faker::PhoneNumber.cell_phone }
  end
end
