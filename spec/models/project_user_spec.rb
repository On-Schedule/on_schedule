require "rails_helper"

describe ProjectUser, type: :model do
  describe 'associations' do
    it { should belong_to :user }
    it { should belong_to :project }
  end

  describe "validations" do
    it { should define_enum_for(:user_level).backed_by_column_of_type :string }
  end
end
