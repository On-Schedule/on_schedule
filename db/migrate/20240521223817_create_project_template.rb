class CreateProjectTemplate < ActiveRecord::Migration[7.0]
  def change
    create_table :project_templates, id: :uuid do |t|
      t.string :name
      t.jsonb :template
      t.belongs_to :company, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
