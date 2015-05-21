class CreateUrls < ActiveRecord::Migration
  def change
    create_table :urls do |t|
      t.string :created_by, :null => false
      t.string :updated_by, :null => false
      t.timestamps null: false

      t.string  :nm
      t.string  :url
    end
  end
end
