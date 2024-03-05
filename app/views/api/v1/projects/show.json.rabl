object @project

attributes :id, :name, :start_date, :end_date, :schedule

child :tasks do
  attributes :id, :name, :start_date, :end_date, :hours
end
