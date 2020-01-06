require 'rails_helper'

RSpec.feature 'Home', type: :feature do
  
  scenario "go to home page and check home icon", js: true do
    visit root_path
    find('nav a', text: '').click
    expect(page).to have_selector('#home_link')
  end
end