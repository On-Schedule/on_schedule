class Task < ApplicationRecord
  belongs_to :project
  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true, comparison: {greater_than_or_equal_to: :start_date}
  validate :start_date_within_project_dates
  validate :end_date_within_project_dates

  enum responsibility: {internal: "internal", external: "external", subcontractor: "subcontractor"}

  def date_index
    {start: (start_date - project.start_date).to_i + 1, stop: (end_date - start_date).to_i + 1}
  end

  def daily_manpower
    if working_days.positive? && hours&.positive?
      (hours.to_f / working_days / project.schedule["hours"]).round(2)
    else
      0
    end
  end

  def working_days
    start_date.upto(end_date).count do |day|
      project.schedule["days"].any? do |project_day|
        day.send("#{project_day}?")
      end
    end
  end

  def total_days
    start_date.upto(end_date).count
  end

  private

  def start_date_within_project_dates
    return false unless start_date && project

    if start_date < project.start_date || start_date > project.end_date
      errors.add(:start_date, "must be inside project dates")
    end
  end

  def end_date_within_project_dates
    return false unless end_date && project

    if end_date < project.start_date || end_date > project.end_date
      errors.add(:end_date, "must be inside project dates")
    end
  end
end
