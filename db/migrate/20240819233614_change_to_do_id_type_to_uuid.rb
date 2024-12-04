class ChangeToDoIdTypeToUuid < ActiveRecord::Migration[7.0]
  def change
    add_column :to_dos, :uuid, :uuid, default: "gen_random_uuid()", null: false

    change_table :to_dos do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE to_dos ADD PRIMARY KEY (id);"
  end
end
