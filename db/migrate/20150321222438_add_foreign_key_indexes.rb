class AddForeignKeyIndexes < ActiveRecord::Migration
  def change
    add_index :meetings, :meeting_type_id
    add_index :members, :belt_id
    add_index :members, :school_id
    add_index :meeting_members, :meeting_id
    add_index :meeting_members, :member_id
    add_index :meeting_members, :role_id
    add_index :meeting_members, :belt_id
  end
end
