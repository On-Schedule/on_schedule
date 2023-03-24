FactoryBot.define do
  factory :company do
    name { FFaker::Company.name }
  end
end
