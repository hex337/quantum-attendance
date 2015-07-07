class AddSlugToSchools < ActiveRecord::Migration
  def change
    add_column :schools, 'slug', :string
  end
end
