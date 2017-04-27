class Member < ActiveRecord::Base

  belongs_to :belt
  belongs_to :school
  has_many :meeting_members
  has_many :meetings, through: :meeting_members

  #default_scope { where(is_active: true) }

  scope :for_school, ->(school) { where(school_id: school.id) unless school.nil? }
  scope :active, -> { where(is_active: true) }

  def self.members_for_query(query, active = true)
    members = []

    # We prioritize belt names over users
    belts = Belt.where("name ILIKE '%#{query}%'")

    belts.each do |belt|
      members = members + belt.members
      members.delete_if{|mem| mem.is_active != active}
    end

    members += Member.where("first_name ILIKE '%#{query}%' OR last_name ILIKE '%#{query}%'").where(is_active: active)

    members
  end

  def self.members_for_typeahead(school = nil)
    members = school.nil? ? Member.where(is_active: true) : Member.where(school: school, is_active: true)

    members.collect do |member|
      {
        id: member.id,
        value: member.full_name,
        belt: member.belt.name,
        school: member.school ? member.school.name : ''
      }
    end
  end

  def full_name
    name = first_name
    name = name + " " + last_name if not last_name.empty?
    name
  end

  def meetings_for_last_30_days
    meetings = MeetingMember.meetings_for_member(self)

    if meetings.length > 0
      MeetingMember.meetings_for_member(self).met_after(Time.now - 30.days)
    else
      []
    end
  end

  def meetings_for_previous_30_days
    meetings = MeetingMember.meetings_for_member(self)

    if meetings.length > 0
      MeetingMember.meetings_for_member(self).met_between(Time.now - 30.days, Time.now - 60.days)
    else
      []
    end
  end
end
