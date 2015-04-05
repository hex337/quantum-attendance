# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

order = 0
['white', 'high white', 'yellow', 'high yellow', 'green', 'high green', 'blue', 'high blue', 'red', 'high red', 'black'].each do |belt|
  order = order + 1
  Belt.create_with(is_active: true, order_by: order).find_or_create_by(name: belt)
end
