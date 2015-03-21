class Meeting < ActiveRecord::Base
  has_many :members, :through => :meeting_members
end
