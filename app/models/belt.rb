class Belt < ActiveRecord::Base
  has_many :members
  default_scope { order("order_by ASC") }
end
