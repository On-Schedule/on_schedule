class ToDo < ApplicationRecord
  belongs_to :owner, polymorphic: true
  belongs_to :responsible_user, class_name: :user, optional: true

  def self.by_status
    to_dos = {
      'Not started': [],
      'In process': [],
      Completed: []
    }

    select(:status).group(:status).each do |to_do|
      @to_dos = where(status: to_do.status)
      to_dos[to_do.status.capitalize] = Rabl.render(@to_dos, 'to_dos/index', format: :hash)
    end

    to_dos
  end
end
