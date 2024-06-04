object @project

attributes :id, :name, :start_date, :end_date, :schedule, :template

node :duration, &:duration

child :users do
  attributes :id, :full_name
end

node :to_dos do |project|
  project.to_dos.by_status
end
