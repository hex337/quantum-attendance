class Belt < ApplicationRecord
  has_many :members
  default_scope { order("order_by ASC") }
end
