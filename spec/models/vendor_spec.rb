require 'rails_helper'

RSpec.describe Vendor, :type => :model do
  describe "Associations" do
    it { should have_many(:items) }
  end

  describe "Validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:description) }
  end
end