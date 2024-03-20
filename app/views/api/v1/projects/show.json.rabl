object @project

attributes :id, :name, :start_date, :end_date, :schedule

node :duration do |project|
  project.duration
end

child :tasks do
  attributes :id, :name, :start_date, :end_date, :hours

  node :date_index do |task|
    task.date_index
  end
end
