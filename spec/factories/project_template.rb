FactoryBot.define do
  factory :project_template do
    company_id { (Company.first || create(:company)).id }
    name { FFaker::CheesyLingo.title }
    template { {tasks: {}} }
  end
end
