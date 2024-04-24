require "rails_helper"

describe Company, type: :model do
  describe 'associations' do
    it { should have_many :users }
    it { should have_many :projects }
  end

  describe "validations" do
    it { should validate_presence_of :name }
  end
end
