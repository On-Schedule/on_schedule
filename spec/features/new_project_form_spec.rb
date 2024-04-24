require "rails_helper"

describe "New PRoject Form", :js do
  let!(:user) { create :user }

  before do
    sign_in user
    visit "/projects/new"
  end

  it "shows required validations by default" do
    page.has_content?("- Name is required")
    page.has_content?("- Start and end dates are required")
    page.has_content?("- Start date must be before end date")
  end

  it "savew button is disabled by by default" do
    expect(page).to have_button('Save', disabled: true)
  end

  it "creates a new project with name, start_date, end_date" do
    fill_in "Project Name", with: "Glacier park"
    expect(page).to_not have_content("- Name is required")

    fill_in "startDate", with: "04-01-2020"
    fill_in "endDate", with: "04-01-2021"
    expect(page).to_not have_content("- Start and end dates are required")
    expect(page).to_not have_content("- Start date must be before end date")
    expect(page).to have_button('Save')

    click_button("Save")
    expect(page).to have_content("Glacier park Schedule")

    project = Project.select(:id).find_by(name: "Glacier park")
    expect(page).to have_current_path("/projects/#{project.id}")
  end

  describe "schedules" do
    before do
      fill_in "Project Name", with: "Glacier park"
      fill_in "startDate", with: "04-01-2020"
      fill_in "endDate", with: "04-01-2021"
    end

    it "uses prebuilt 5x8 (M-F) by default" do
      click_button("Save")

      expect(page).to have_content("Glacier park Schedule")

      project = Project.select(:schedule).find_by(name: "Glacier park")
      expect(project.schedule).to eq({"days" => ["monday", "tuesday", "wednesday", "thursday", "friday"], "hours" => 8})
    end

    it "can use prebuilt 4x10 (M-Th)" do
      choose("4x10 (M-Th)")
      click_button("Save")

      expect(page).to have_content("Glacier park Schedule")

      project = Project.select(:schedule).find_by(name: "Glacier park")
      expect(project.schedule).to eq({"days" => ["monday", "tuesday", "wednesday", "thursday"], "hours" => 10})
    end

    it "can use prebuilt 4x10 (Tu-F)" do
      choose("4x10 (Tu-F)")
      click_button("Save")

      expect(page).to have_content("Glacier park Schedule")

      project = Project.select(:schedule).find_by(name: "Glacier park")
      expect(project.schedule).to eq({"days" => ["tuesday", "wednesday", "thursday", "friday"], "hours" => 10})
    end

    it "can be custom defined" do
      expect(page).to_not have_content("Workday Hours")
      choose("Custom schedule")
      expect(page).to have_content("Workday Hours")

      uncheck("monday")
      uncheck("tuesday")
      uncheck("thursday")
      check("sunday")
      # bug with capybara needs this line for some reason
      fill_in "hours", with: 2
      fill_in "hours", with: 10
      click_button("Save")

      expect(page).to have_content("Glacier park Schedule")

      project = Project.select(:schedule).find_by(name: "Glacier park")
      expect(project.schedule).to eq({"days" => ["wednesday", "friday", "sunday"], "hours" => 20})
    end

    it "at least one day is required" do
      choose("Custom schedule")
      uncheck("monday")
      uncheck("tuesday")
      uncheck("wednesday")
      uncheck("thursday")
      expect(page).to_not have_content("- At least one day must be selected")
      expect(page).to have_button('Save')
      uncheck("friday")
      expect(page).to have_content("- At least one day must be selected")
      expect(page).to have_button('Save', disabled: true)
    end

    it "hours must be between 1 and 24" do
      choose("Custom schedule")
      expect(page).to_not have_content("- Hours must be between 1 and 24")
      expect(page).to have_button('Save')
      fill_in "hours", with: 40
      expect(page).to have_content("- Hours must be between 1 and 24")
      expect(page).to have_button('Save', disabled: true)
    end
  end

  describe "add users section" do
    let!(:john) { create :user, first_name: "John", last_name: "Smith" }
    let!(:alice) { create :user, first_name: "Alice", last_name: "Jenkens" }
    let!(:jill) { create :user, first_name: "Jill", last_name: "Cable" }
    let!(:eddie) { create :user, first_name: "Eddie", last_name: "Walker" }

    before do
      fill_in "Project Name", with: "Glacier park"
      fill_in "startDate", with: "04-01-2020"
      fill_in "endDate", with: "04-01-2021"
    end

    it "adds current user as a full user by default" do
      click_button("Save")

      expect(page).to have_content("Glacier park Schedule")
      project_user = Project.find_by(name: "Glacier park").project_users.first

      expect(project_user.user).to eq(user)
      expect(project_user.user_level).to eq("full")
    end

    it "current user cannot be removed as full user" do
      expect(page).to have_button(user.full_name, disabled: true)
    end

    it "can add additional full users" do
      click_button alice.full_name
      click_button("Save")

      expect(page).to have_content("Glacier park Schedule")
      users = Project.find_by(name: "Glacier park").users

      expect(users).to eq([user, alice])
    end

    it "can add additional read-only users" do
      click_button alice.full_name

      within "#Jill-Cable" do
        click_button "Read only"
      end

      click_button("Save")

      expect(page).to have_content("Glacier park Schedule")
      project = Project.find_by(name: "Glacier park")
      users = project.users

      expect(users).to eq([user, alice, jill])

      alice_project_user = ProjectUser.find_by(project:, user: alice)
      jill_project_user = ProjectUser.find_by(project:, user: jill)

      expect(alice_project_user.user_level).to eq "full"
      expect(jill_project_user.user_level).to eq "read_only"
    end

    it "can remove users from added users list" do
      # add to users list
      click_button alice.full_name
      # remove from users list
      click_button alice.full_name

      click_button("Save")

      expect(page).to have_content("Glacier park Schedule")
      project = Project.find_by(name: "Glacier park")
      users = project.users

      expect(users).to eq([user])
    end
  end
end
