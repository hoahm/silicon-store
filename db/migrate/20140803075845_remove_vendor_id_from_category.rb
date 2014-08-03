class RemoveVendorIdFromCategory < ActiveRecord::Migration
  def change
    remove_column :categories, :vendor_id, :integer
  end
end