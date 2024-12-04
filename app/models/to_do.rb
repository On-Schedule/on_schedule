class ToDo < ApplicationRecord
  belongs_to :owner, polymorphic: true
  belongs_to :responsible_user, class_name: :user, optional: true

  default_scope { where(deleted_at: nil) }
  scope :only_deleted, -> { unscope(where: :deleted_at).where.not(deleted_at: nil) }
  scope :with_deleted, -> { unscope(where: :deleted_at) }

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
