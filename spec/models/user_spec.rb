require "rails_helper"

describe User, type: :model do
  describe 'associations' do
    it { should belong_to :company }
    it { should have_many :project_users }
    it { should have_many(:projects).through :project_users }
    it { should have_many(:tasks).through :projects }
  end

  describe "validations" do
    it { should validate_presence_of :first_name }
    it { should validate_presence_of :last_name }
    it { should validate_presence_of :email }
  end

  describe "instance method" do
    it "#full_name" do
      subject.first_name = "Sam"
      subject.last_name = "Hill"

      expect(subject.full_name).to eq("Sam Hill")
    end
  end
end
