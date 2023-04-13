class AddMeetingMemberUniqueIndex < ActiveRecord::Migration[4.2]
  def change
    add_index :meeting_members, [:member_id, :meeting_id, :role_id], unique: true
    add_index :meetings, :met, order: { released_at: "DESC NULLS LAST" }
  end
end
