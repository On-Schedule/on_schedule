object current_user

attributes :id, :full_name, :role

child :projects do
  attributes :id, :name
end

node :tasks do |user|
  user.tasks.joins(:project).select(:id, :name, :project_id, "projects.name as project_name")
end

child :company do
  attributes :id, :name
end
