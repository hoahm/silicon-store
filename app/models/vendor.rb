class Vendor < ActiveRecord::Base
  has_paper_trail
  has_many :items

  validates :name, presence: true
  validates :description, presence: true
end