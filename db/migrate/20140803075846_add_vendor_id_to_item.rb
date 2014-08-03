class AddVendorIdToItem < ActiveRecord::Migration
  def change
    add_reference :items, :vendor, index: true
  end
end