object current_user

attributes :id, :full_name

child :projects do
  attributes :id, :name
end

child :tasks do
  attributes :id, :name
  child :project do
    attributes :id, :name
  end
end

child :company do
  attributes :id, :name
end
