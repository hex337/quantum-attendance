class ConvertMetColumn < ActiveRecord::Migration[4.2]
  def change
    change_column :meetings, :met, :datetime
  end
end
