class AnalyticsService
  class << self
    def get_week_overview user, options={}
      start_date = options[:start_date] || Date.today.beginning_of_week(:sunday)
      end_date = options[:end_date] || start_date.end_of_week(:sunday)
      tasks = user.tasks.where("tasks.start_date <= ?", end_date).where("tasks.end_date >= ?", start_date)
      tasks_starting = tasks.where("tasks.start_date >= ?", start_date).count
      tasks_ending = tasks.where("tasks.end_date <= ?", end_date).count

      {
        daily_manpower: manpower_by_day(tasks, start_date, end_date),
        current_tasks: tasks.count,
        tasks_starting:,
        tasks_ending:
      }
    end

    def manpower_by_day tasks, start_date, end_date
      start_date.upto(end_date).map do |date|
        tasks
          .joins(:project)
          .select(
            :id,
            :hours,
            :start_date,
            :end_date,
            :project_id,
            "projects.name",
            "projects.schedule->'days' as project_days",
            "projects.schedule->'hours' as project_hours"
          )
          .where("tasks.hours != 0")
          .where("tasks.start_date <= ?", date)
          .where("tasks.end_date >= ?", date)
          .where("projects.schedule->'days' ? :day", day: date.strftime('%A').downcase)
          .sum(&:daily_manpower).round(2)
      end
    end
  end
end
