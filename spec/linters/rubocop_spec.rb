require "rails_helper"

describe "rubocop analysis" do
  subject(:report) { `bundle exec rubocop` }

  it "has no offenses" do
    expect(report).to match(/no\ offenses\ detected/)
  end
end
