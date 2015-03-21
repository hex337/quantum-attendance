class Member < ActiveRecord::Base
  has_one :belt
  has_one :school
end
