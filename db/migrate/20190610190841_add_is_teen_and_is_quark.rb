class AddIsTeenAndIsQuark < ActiveRecord::Migration
  def change
    add_column :members, :is_quark, :boolean, default: false
    add_column :members, :is_teen, :boolean, default: false
  end
end
