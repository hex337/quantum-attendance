class AddSlugToSchools < ActiveRecord::Migration[4.2]
  def change
    add_column :schools, 'slug', :string
  end
end
