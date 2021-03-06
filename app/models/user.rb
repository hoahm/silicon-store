class User < ActiveRecord::Base
  rolify
  has_paper_trail
  has_many :items, dependent: :destroy
  has_many :openauths, dependent: :destroy

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable,
         :omniauthable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :date_of_birth, presence: false
  validates :mobile, presence: false, allow_nil: true, allow_blank: true, uniqueness: true

  before_save :normalize_data
  after_create :add_default_role

  def full_name
    [self.first_name, self.last_name].delete_if{ |x| x.blank? }.join(" ")
  end

  def normalize_data
    self.first_name = self.first_name.strip if self.first_name.present?
    self.last_name = self.last_name.strip if self.last_name.present?
    self.email = self.email.downcase.strip if self.email.present?
    self.mobile = self.mobile.strip if self.mobile.present?
  end

  def add_default_role
    if self.roles.empty?
      self.add_role :member
    end
  end

 def self.find_for_oauth(auth, signed_in_resource = nil)
    openauth = Openauth.find_for_oauth(auth)
    user = openauth.user ? openauth.user : signed_in_resource

    if user.nil?
      email = auth.info.email
      user = User.where(email: email).first if email.present?

      # Create new user
      if user.nil?
        user = User.new(
          first_name: auth.extra.raw_info.first_name,
          last_name: auth.extra.raw_info.last_name,
          email: email,
          date_of_birth: (10..30).to_a.sample.year.ago,
          password: Devise.friendly_token.first(8)
        )
        user.skip_confirmation!
        user.save!
      end
    end

    # Associate the openauth with the current user
    if openauth.user != user
      openauth.user = user
      openauth.save!
    end

    user
  end

  def facebook_link
    %{<a href="#{self.openauths.facebook.first.link}">#{self.full_name}</a>}.html_safe if self.openauths.facebook.first
  end
end