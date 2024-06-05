attributes :id, :title, :description, :due_date

node :status do |t|
  t.status.capitalize
end