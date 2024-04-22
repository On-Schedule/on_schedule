FactoryBot.define do
  factory :task do
    project
    name { FFaker::AnimalUS.common_name }
    start_date { (project.start_date...project.end_date).to_a.sample() }
    end_date { (start_date...project.end_date).to_a.sample() }
    hours { (4...50).to_a.sample() * ((end_date - start_date).to_i + 1) }
  end
end
