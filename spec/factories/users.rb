FactoryBot.define do
  factory :user do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    email { FFaker::Internet.unique.email }
    password { "password" }
    password_confirmation { password }
    company_id { (Company.first || create(:company)).id }
  end
end