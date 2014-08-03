require 'rails_helper'

RSpec.describe Category, :type => :model do
  describe "Validations" do
    it { should validate_presence_of(:name) }
  end
end