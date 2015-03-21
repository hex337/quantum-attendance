class CreateMeetings < ActiveRecord::Migration
  def change
    create_table :meetings do |t|
      t.integer :meeting_type_id
      t.date :met
      t.text :comment

      t.timestamps
    end
  end
end
