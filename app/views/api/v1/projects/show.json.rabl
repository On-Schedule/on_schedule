object @project

attributes :id, :name, :start_date, :end_date, :schedule, :template

node :duration, &:duration
