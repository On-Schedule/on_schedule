attributes :id, :name, :start_date, :end_date, :hours, :cost_code, :description, :responsibility

node :date_index, &:date_index
node :daily_manpower, &:daily_manpower
node :working_days, &:working_days
node :total_days, &:total_days
