class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         :confirmable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :date_of_birth, presence: true
  validates :mobile, presence: false, allow_nil: true, allow_blank: true, uniqueness: true

  def full_name
    [self.first_name, self.last_name].delete_if{ |x| x.blank? }.join(" ")
  end
end
