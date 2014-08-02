# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :category do |f|
    f.name { Faker::Commerce.department(1, true) }
    f.vendor nil
  end
end
