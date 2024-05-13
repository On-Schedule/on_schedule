class Project < ApplicationRecord
  belongs_to :company
  has_many :project_users
  has_many :users, through: :project_users
  has_many :tasks

  validates_presence_of :name, :start_date, :end_date, :schedule
  validate :start_date_before_end_date
  validate :schedule_days_and_hours_are_valid

  def duration
    (end_date - start_date).to_i + 1
  end

  private

  def schedule_days_and_hours_are_valid
    return false unless schedule

    errors.add(:schedule_days, "at least one day must be selected") if schedule['days'].blank?
    errors.add(:schedule_hours, "must be between 1 and 24") unless schedule['hours']&.between?(1, 24)
  end

  def start_date_before_end_date
    return false unless start_date && end_date

    errors.add(:end_date, "must be after start date") unless start_date < end_date
  end
end
