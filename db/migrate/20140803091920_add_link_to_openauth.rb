class AddLinkToOpenauth < ActiveRecord::Migration
  def change
    add_column :openauths, :link, :string
  end
end