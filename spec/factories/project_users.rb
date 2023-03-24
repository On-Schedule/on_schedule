FactoryBot.define do
  factory :project_user do
    project
    user
    user_level { "full" }
  end
end