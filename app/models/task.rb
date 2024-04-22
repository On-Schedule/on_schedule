class Task < ApplicationRecord
  belongs_to :project
  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true, comparison: {greater_than_or_equal_to: :start_date}
  validate :within_project_dates

  enum responsibility: {internal: "internal", external: "external", subcontractor: "subcontractor"}

  def date_index
    {start: (start_date - project.start_date).to_i + 1, stop: (end_date - start_date).to_i + 1}
  end

  private

  def within_project_dates
    if start_date < project.start_date || start_date > project.end_date
      errors.add(:start_date, "must be inside project dates")
    end

    if end_date < project.start_date || end_date > project.end_date
      errors.add(:end_date, "must be inside project dates")
    end
  end
end
