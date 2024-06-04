class ToDo < ApplicationRecord
  belongs_to :owner, polymorphic: true
  belongs_to :responsible_user, class_name: :user, optional: true

  def self.by_status
    to_dos = {
      "Not Started": [],
      "In Process": [],
      "Completed": []
    }

    self.select(:status).group(:status).each do |to_do|
      to_dos[to_do.status] = self.where(status: to_do.status)
    end

    to_dos
  end
end