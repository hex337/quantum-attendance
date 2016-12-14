class Meeting < ActiveRecord::Base
  default_scope { order("met DESC") }

  scope :for_school, lambda {|school|
    where(school_id: school.id) unless school.nil?
  }

  belongs_to :meeting_type
  belongs_to :school
  has_many :meeting_members
  has_many :members, :through => :meeting_members

  @_instructor = nil

  def instructor
    @_instructor || self._get_instructor
  end
  
  def pretty_name
    "#{self.met.strftime('%a %b %d, %Y')}: #{self.meeting_type.name}"
  end

  def _get_instructor
    self.meeting_members.each do |mm|
      if mm.role_id == Role::TEACHER
        @_instructor = mm.member
        return @_instructor
      end
    end
  end
end
