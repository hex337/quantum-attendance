class Meeting < ActiveRecord::Base
  belongs_to :meeting_type
  has_many :meeting_members
  has_many :members, :through => :meeting_members
end
