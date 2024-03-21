class Project < ApplicationRecord
  belongs_to :company
  has_many :project_users
  has_many :users, through: :project_users
  has_many :tasks

  validates_presence_of :name, :start_date, :end_date
  validate :start_date_before_end_date
  validate :schedule_days_and_hours_are_valid

  def duration
    (end_date - start_date).to_i + 1
  end

  private

  def schedule_days_and_hours_are_valid
    errors.add(:schedule_days, "at least on day must be selected") if schedule['days'].blank?
    errors.add(:schedule_hours, "schedule hours must be between 1 and 24") unless schedule['hours'].between?(1, 24)
  end

  def start_date_before_end_date
    start_date < end_date
  end
end
