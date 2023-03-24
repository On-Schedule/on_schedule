class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.belongs_to :company, null: false, foreign_key: true
      t.date :start_date
      t.date :end_date
      t.jsonb :schedule

      t.timestamps
    end
  end
end
