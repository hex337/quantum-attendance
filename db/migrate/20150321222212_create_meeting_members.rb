class CreateMeetingMembers < ActiveRecord::Migration[4.2]
  def change
    create_table :meeting_members do |t|
      t.integer :meeting_id
      t.integer :member_id
      t.integer :role_id
      t.integer :belt_id

      t.timestamps
    end
  end
end
