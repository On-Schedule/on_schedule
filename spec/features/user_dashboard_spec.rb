require "rails_helper"

describe "User Dashboard", :js do
  let!(:user) { create :user }
  let!(:project1) { create :project, name: "Red Fields Lodge" }
  let!(:projectUser1) { create :project_user, project: project1, user: }
  let!(:project2) { create :project, name: "Capital Reform" }
  let!(:projectUser2) { create :project_user, project: project2, user: }
  let!(:project3) { create :project, name: "Top HQ" }
  let!(:projectUser3) { create :project_user, project: project3, user: }
  let!(:project4) { create :project, name: "Capital Hill" }

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
    page.has_css?("#projects-card")
    page.has_css?("#current-tasks-card")
    page.has_css?("#overview-card")
  end

  describe "project card" do
    it "shows all of a users projects" do
      within "#projects-card" do
        expect(page).to have_content(project1.name)
        expect(page).to have_content(project2.name)
        expect(page).to have_content(project3.name)
        expect(page).to_not have_content(project4.name)
      end
    end

    it "can search for projects by name" do
      within "#projects-card" do
        fill_in "Search", with: "re"
        expect(page).to have_content(project1.name)
        expect(page).to have_content(project2.name)
        expect(page).to_not have_content(project3.name)

        fill_in "Search", with: "red"
        expect(page).to have_content(project1.name)
        expect(page).to_not have_content(project2.name)
        expect(page).to_not have_content(project3.name)
      end
    end
  end
end
