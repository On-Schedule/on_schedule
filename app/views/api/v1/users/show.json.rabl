object current_user

attributes :id, :full_name

child :projects do
  attributes :id, :name
end

child :company do
  attributes :id, :name
end
