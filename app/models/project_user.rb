class ProjectUser < ApplicationRecord
  belongs_to :project
  belongs_to :user

  default_scope { where(deleted_at: nil) }
  scope :only_deleted, -> { unscope(where: :deleted_at).where.not(deleted_at: nil) }
  scope :with_deleted, -> { unscope(where: :deleted_at) }

  enum user_level: {full: 'full', read_only: 'read'}
end
