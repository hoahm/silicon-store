class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :sku
      t.references :category, index: true
      t.references :user, index: true
      t.integer :quantity
      t.float :price

      t.timestamps
    end
  end
end
