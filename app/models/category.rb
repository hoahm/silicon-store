class Category < ActiveRecord::Base
  has_paper_trail
  belongs_to :vendor

  validates :name, presence: true
end