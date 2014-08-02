require 'rails_helper'

RSpec.describe Openauth, :type => :model do
  context "Associations" do
    it { should belong_to(:user) }
  end

  context "Validations" do
    it { should validate_presence_of(:uid) }
    it { should validate_presence_of(:provider) }
    it { should validate_uniqueness_of(:uid) }
  end
end