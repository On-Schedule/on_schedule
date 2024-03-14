object @project

attributes :id, :name, :start_date, :end_date, :schedule

node :duration do |project|
  project.duration
end

child :tasks do
  attributes :id, :name, :start_date, :end_date, :hours

  node :chart_index_values do |task|
    task.chart_index_values
  end
end
