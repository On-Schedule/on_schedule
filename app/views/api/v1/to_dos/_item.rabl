attributes :id, :title, :description, :due_date, :owner_type, :owner_id, :user_id

node :status do |t|
  t.status.capitalize
end
