require 'rails_helper'

RSpec.describe Item, :type => :model do
  context "Associations" do
    it { should belong_to(:category) }
    it { should belong_to(:user) }
    it { should belong_to(:vendor) }
    it { should have_attached_file(:photo) }
  end

  context "Validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:quantity) }
    it { should validate_numericality_of(:quantity).is_greater_than_or_equal_to(0) }
    it { should validate_presence_of(:price) }
    it { should validate_attachment_content_type(:photo).allowing('image/jpeg', 'image/png', 'image/jpg') }

    it "has correct photo style geometry" do
      expect(Item.attachment_definitions[:photo][:styles][:thumb]).to eq("100x100>")
      expect(Item.attachment_definitions[:photo][:styles][:medium]).to eq("300x300>")
    end
  end
end