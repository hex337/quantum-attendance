class MeetingMember < ActiveRecord::Base
  belongs_to :member
  belongs_to :meeting
  belongs_to :belt
  belongs_to :role

  scope :met_after, ->(time) { where("met > ?", time) }
end
