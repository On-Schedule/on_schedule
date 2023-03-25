require 'rails_helper'

describe "login" do
  let(:user) { create :user }

  it "can log in an existing user" do
    visit root_path

    expect(current_path).to eq("/users/sign_in")
    expect(page).to have_field("Email")
    expect(page).to have_field("Password")

    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_on "Log in"

    expect(current_path).to eq(root_path)
  end
end