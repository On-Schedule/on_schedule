require "rails_helper"

describe Project, type: :model do
  describe 'associations' do
    it { should belong_to :company }
    it { should have_many :tasks }
    it { should have_many :project_users }
    it { should have_many(:users).through :project_users }
  end

  describe "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :start_date }
    it { should validate_presence_of :end_date }
    it { should validate_presence_of :schedule }

    it "should validate schedule_days_and_hours_are_valid" do
      subject.schedule = {}
      subject.valid?

      expect(subject.errors.full_messages).to include("Schedule days at least one day must be selected")
      expect(subject.errors.full_messages).to include("Schedule hours must be between 1 and 24")
    end

    it "should validate start_date_before_end_date" do
      subject.start_date = "2020-01-02"
      subject.end_date = "2020-01-01"
      subject.valid?

      expect(subject.errors.full_messages).to include("End date must be after start date")
    end
  end

  describe "instance method" do
    it "#duration" do
      project = FactoryBot.create :project, start_date: "2020-01-01", end_date: "2020-01-25"

      expect(project.duration).to eq(25)
    end
  end
end
