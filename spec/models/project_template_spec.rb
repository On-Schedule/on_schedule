require "rails_helper"

describe ProjectTemplate, type: :model do
  describe 'associations' do
    it { should belong_to :company }
  end

  describe "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :template }
    it "shoud have a unique name" do
      FactoryBot.create :project_template
      should validate_uniqueness_of(:name).scoped_to :company_id
    end
  end

  # describe "class methods" do
  # end

  # describe "instance methods" do
  # end
end
