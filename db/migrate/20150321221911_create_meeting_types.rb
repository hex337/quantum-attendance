class CreateMeetingTypes < ActiveRecord::Migration
  def change
    create_table :meeting_types do |t|
      t.string :name
      t.text :comment
      t.boolean :is_active

      t.timestamps
    end
  end
end
