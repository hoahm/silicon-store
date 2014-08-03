require 'rails_helper'

RSpec.describe User, :type => :model do
  context "Associations" do
    it { should have_many(:openauths) }
  end

  context "Validations" do
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should_not validate_presence_of(:date_of_birth) }
    it { should_not validate_presence_of(:mobile) }
    it { should allow_value(nil).for(:mobile) }
    it { should validate_uniqueness_of(:mobile) }

    it "has a valid factory" do
      expect(FactoryGirl.create(:user)).to be_valid
    end

    it "is invalid without email" do
      expect(FactoryGirl.build(:user, email: nil)).to be_invalid
    end

    it "is invalid without first name" do
      expect(FactoryGirl.build(:user, first_name: nil)).to be_invalid
    end

    it "is invalid without last name" do
      expect(FactoryGirl.build(:user, last_name: nil)).to be_invalid
    end

    it "is valid without date of birth" do
      expect(FactoryGirl.build(:user, date_of_birth: nil)).to be_valid
    end

    it "allow mobile field is nil" do
      expect(FactoryGirl.build(:user, mobile: nil)).to be_valid
    end
  end

  context "Instance methods" do
    before(:each) do
      @user = FactoryGirl.create(:user)
    end

    describe "full_name" do
      it "is defined" do
        expect(@user).to respond_to(:full_name)
      end

      it "returns a user's full_name as a string" do
        expect(@user.full_name).to eq("#{@user.first_name} #{@user.last_name}")
      end
    end
  end

  context "Callbacks" do
    before(:each) do
      @user = FactoryGirl.create(:user)
    end

    describe "add_default_role" do
      it "is defined" do
        expect(@user).to respond_to(:add_default_role)
      end

      it "should trigger 'add_default_role' after create" do
        expect(@user.has_role? :member).to eq(true)
      end
    end
  end
end
