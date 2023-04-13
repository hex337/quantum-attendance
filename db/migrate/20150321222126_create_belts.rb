class CreateBelts < ActiveRecord::Migration[4.2]
  def change
    create_table :belts do |t|
      t.string :name
      t.text :comment
      t.boolean :is_active
      t.integer :order_by

      t.timestamps
    end
  end
end
