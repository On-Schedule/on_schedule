class AddCostCodeToTask < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :cost_code, :string
  end
end
