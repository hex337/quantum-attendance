class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :first_name
      t.string :last_name
      t.integer :belt_id
      t.integer :school_id
      t.text :comment
      t.boolean :is_active
      t.boolean :is_teacher
      t.boolean :is_kid

      t.timestamps
    end
  end
end
