class CreateOpenauths < ActiveRecord::Migration
  def change
    create_table :openauths do |t|
      t.string :provider
      t.references :user, index: true
      t.string :uid

      t.timestamps
    end
  end
end
