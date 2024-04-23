require "rails_helper"

describe "User Dashboard", :js do
  let!(:user) { create :user }
  let!(:project1) { create :project }
  let!(:projectUser1) { create :project_user, project: project1, user: }
  let!(:project2) { create :project }
  let!(:projectUser2) { create :project_user, project: project2, user: }

  before do
    sign_in user
    visit root_path
  end

  it "has a navbar" do
    within "nav" do
      expect(page).to have_content(user.company.name)
    end
  end

  it "has default card" do
    expect(page).to have_css("#projects-card")
    expect(page).to have_css("#current-tasks-card")
    expect(page).to have_css("#overview-card")
  end
end
