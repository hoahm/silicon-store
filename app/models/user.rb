class User < ActiveRecord::Base
  rolify
  has_paper_trail
  has_many :items, dependent: :destroy

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         :confirmable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :date_of_birth, presence: true
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
end