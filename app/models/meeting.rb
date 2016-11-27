class Meeting < ActiveRecord::Base
  default_scope { order("met DESC") }

  scope :for_school, lambda {|school|
    where(school_id: school.id) unless school.nil?
  }

  belongs_to :meeting_type
  belongs_to :school
  has_many :meeting_members
  has_many :members, :through => :meeting_members
end
