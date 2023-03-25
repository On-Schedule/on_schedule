FactoryBot.define do
  factory :project do
    name { FFaker::CheesyLingo.title }
    company_id { (Company.first || create(:company)).id }
    start_date { Date.yesterday }
    end_date { Date.today + 2.years }
    schedule { {days: [:monday, :tuesday, :wednesday, :thursday, :friday], hours: 8} }
  end
end
