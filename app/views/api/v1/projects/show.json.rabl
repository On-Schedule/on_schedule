object @project

attributes :id, :name, :start_date, :end_date, :schedule

node :duration, &:duration
