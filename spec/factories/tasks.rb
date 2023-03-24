FactoryBot.define do
  factory :task do
    project
    name {FFaker::AnimalUS.common_name}
    start_date { Date.tomorrow }
    end_date { start_date + 2.weeks }
  end
end