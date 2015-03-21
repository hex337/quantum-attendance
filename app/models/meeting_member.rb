class MeetingMember < ActiveRecord::Base
  has_one :member
  has_one :meeting
  has_one :belt
  has_one :role
end
