class ConvertMetColumn < ActiveRecord::Migration
  def change
    change_column :meetings, :met, :datetime
  end
end
