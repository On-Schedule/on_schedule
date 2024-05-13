FactoryBot.define do
  factory :task do
    project
    name { "#{FFaker::AnimalUS.common_name} enclosure" }
    start_date { (project.start_date...project.end_date).to_a.sample }
    end_date { (start_date...project.end_date).to_a.sample }
    hours { (4...500).to_a.sample }
  end
end
