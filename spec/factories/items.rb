# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :item do |f|
    f.name { Faker::Commerce.product_name }
    f.description { Faker::Lorem.sentences }
    f.sku { Faker::Code.ean }
    f.category nil
    f.user nil
    f.quantity (0..100).to_a.sample
    f.price { Faker::Commerce.price }
    f.vendor nil
  end
end