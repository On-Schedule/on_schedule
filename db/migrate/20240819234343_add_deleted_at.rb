class AddDeletedAt < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :deleted_at, :datetime
    add_column :project_users, :deleted_at, :datetime
    add_column :tasks, :deleted_at, :datetime
    add_column :to_dos, :deleted_at, :datetime
  end
end
