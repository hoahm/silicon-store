# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :vendor do |f|
    f.name { Faker::Company.name }
    f.description { Faker::Lorem.sentences }
  end
end