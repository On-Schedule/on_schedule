class ToDo < ApplicationRecord
  belongs_to :owner, polymorphic: true
  belongs_to :responsible_user, class_name: :user, optional: true
end