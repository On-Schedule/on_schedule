class ProjectUser < ApplicationRecord
  belongs_to :project
  belongs_to :user

  enum user_level: {full: 'full', read_only: 'read'}
end
