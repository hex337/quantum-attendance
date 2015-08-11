class AddSchoolIdToMeetings < ActiveRecord::Migration
  def change
    add_column :meetings, :school_id, :integer, :default => 1
  end
end
