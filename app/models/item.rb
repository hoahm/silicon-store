class Item < ActiveRecord::Base
  has_paper_trail
  belongs_to :category
  belongs_to :vendor
  belongs_to :user

  has_attached_file :photo,
    :styles => {
      :medium => "280x280>",
      :thumb => "100x100>"
    },
    :default_url => "/images/:style/missing.png"

  validates :name, presence: true
  validates :description, presence: true
  validates :quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :price, presence: true
  validates_attachment :photo, :content_type => { :content_type => ['image/jpeg', 'image/png', 'image/jpg'] }

  def as_json(options = {})
    json = super(options)
    json[:photo_url] = photo.url
    json[:thumb_url] = photo.url(:thumb)
    json[:medium_url] = photo.url(:medium)
    json
  end
end