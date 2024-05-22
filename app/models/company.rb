class Company < ApplicationRecord
  has_many :projects
  has_many :users
  has_many :project_templates

  validates_presence_of :name
end
