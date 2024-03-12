class CreateProjectUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :project_users, id: :uuid do |t|
      t.belongs_to :project, null: false, foreign_key: true, type: :uuid
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.string :user_level, default: "full"

      t.timestamps
    end
  end
end
