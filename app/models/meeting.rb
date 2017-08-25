class Meeting < ActiveRecord::Base
  default_scope { order("met DESC") }

  scope :met_between, ->(start_time, end_time) { where("met >= ? AND met < ?", end_time, start_time) }
  scope :met_after, ->(time) { where("met > ?", time) }

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

  def students
    @students ||= self.meeting_members.select { |mm| mm.role_id == Role::student_role_id }
  end

  def assistants
    @assistants ||= self.meeting_members.select { |mm| mm.role_id == Role::assistant_role_id }
  end

  def member_count
    @member_count ||= self.meeting_members.count
  end
  
  def pretty_name
    "#{self.met.strftime('%a %b %d, %Y')}: #{self.meeting_type.name}"
  end

  def _get_instructor
    self.meeting_members.each do |mm|
      if mm.role_id == Role::teacher_role_id
        @_instructor = mm.member
        return @_instructor
      end
    end
  end
end
