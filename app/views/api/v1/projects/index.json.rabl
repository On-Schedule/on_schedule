collection @projects

attributes :id, :name, :start_date, :end_date, :schedule, :template

node :duration, &:duration

child :users do
  attributes :id, :full_name
  node :user_level do |user|
    user.project_users.find_by(project_id: @project.id).user_level
  end
end

node :to_dos do |project|
  project.to_dos.by_status
end
