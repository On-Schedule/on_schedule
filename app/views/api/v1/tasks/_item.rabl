attributes :id, :name, :start_date, :end_date, :hours, :cost_code, :description, :responsibility

node :date_index, &:date_index
