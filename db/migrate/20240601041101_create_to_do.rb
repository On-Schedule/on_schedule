class CreateToDo < ActiveRecord::Migration[7.0]
  def change
    create_table :to_dos do |t|
      t.string :title
      t.string :description
      t.date :due_date
      t.string :status, default: "not_started"
      t.references :user, null: true, foreign_key: true, type: :uuid
      t.references :owner, null: false, polymorphic: true, type: :uuid

      t.timestamps
    end
  end
end
