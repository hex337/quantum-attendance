class AddSchoolIdToMeetings < ActiveRecord::Migration[4.2]
  def change
    add_column :meetings, :school_id, :integer, :default => 1
  end
end
