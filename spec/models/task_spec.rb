require "rails_helper"

describe Task, type: :model do
  describe 'associations' do
    it { should belong_to :project }
  end

  describe "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :start_date }
    it { should validate_presence_of :end_date }
    it {
      subject.start_date = "2020-01-01"
      should validate_comparison_of(:end_date).is_greater_than_or_equal_to :start_date
    }
    it { should define_enum_for(:responsibility).backed_by_column_of_type :string }

    it "validates start_date_within_project_dates" do
      subject.project = FactoryBot.create(:project, start_date: "2020-01-02", end_date: "2020-01-10")

      subject.start_date = "2020-01-01"
      subject.valid?
      expect(subject.errors.full_messages).to include("Start date must be inside project dates")

      subject.start_date = "2020-01-05"
      subject.valid?
      expect(subject.errors.full_messages).to_not include("Start date must be inside project dates")

      subject.start_date = "2020-01-11"
      subject.valid?
      expect(subject.errors.full_messages).to include("Start date must be inside project dates")
    end

    it "validates end_date_within_project_dates" do
      subject.project = FactoryBot.create(:project, start_date: "2020-01-02", end_date: "2020-01-10")

      subject.end_date = "2020-01-01"
      subject.valid?
      expect(subject.errors.full_messages).to include("End date must be inside project dates")

      subject.end_date = "2020-01-05"
      subject.valid?
      expect(subject.errors.full_messages).to_not include("End date must be inside project dates")

      subject.end_date = "2020-01-11"
      subject.valid?
      expect(subject.errors.full_messages).to include("End date must be inside project dates")
    end
  end

  describe "instance method" do
    it "#date_index" do
      project = FactoryBot.create(:project, start_date: "2020-01-01", end_date: "2020-01-25")
      task = FactoryBot.create(:task, start_date: "2020-01-02", end_date: "2020-01-25", project:)

      expect(task.date_index).to eq({start: 2, stop: 24})
    end
  end
end
