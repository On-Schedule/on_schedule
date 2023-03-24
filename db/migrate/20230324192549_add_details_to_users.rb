class AddDetailsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :company, null: false, foreign_key: true
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
  end
end
