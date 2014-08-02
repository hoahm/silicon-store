require 'rails_helper'

RSpec.describe Category, :type => :model do
  describe "Associations" do
    it { should belong_to(:vendor) }
  end

  describe "Validations" do
    it { should validate_presence_of(:name) }
  end
end