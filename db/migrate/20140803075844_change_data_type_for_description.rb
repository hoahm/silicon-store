class ChangeDataTypeForDescription < ActiveRecord::Migration
  def change
    change_column :vendors, :description,  :text
    change_column :items, :description,  :text
  end
end