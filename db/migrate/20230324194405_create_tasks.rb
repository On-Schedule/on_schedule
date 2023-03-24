class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.belongs_to :project, null: false, foreign_key: true
      t.date :start_date
      t.date :end_date
      t.integer :hours

      t.timestamps
    end
  end
end
