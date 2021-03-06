class Openauth < ActiveRecord::Base

  validates :uid, presence: true
  validates :provider, presence: true
  validates_uniqueness_of :uid, scope: :provider

  belongs_to :user

  scope :facebook, -> { where(provider: "facebook") }

  def self.find_for_oauth(auth)
    openauth = find_by(provider: auth.provider, uid: auth.uid)
    if openauth.nil?
      openauth = create(provider: auth.provider, uid: auth.uid, link: auth.extra.raw_info.link)
    end
    openauth
  end

end