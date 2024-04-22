Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new(
    args: ['headless', 'no-sandbox', 'disable-gpu', 'disable-dev-shm-usage']
  )

  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    options:
  )
end

Capybara.default_driver = :headless_chrome
Capybara.javascript_driver = :headless_chrome
