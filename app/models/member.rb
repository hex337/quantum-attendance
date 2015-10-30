class Member < ActiveRecord::Base
  belongs_to :belt
  belongs_to :school
  has_many :meeting_members
  has_many :meetings, through: :meeting_members

  scope :for_school, lambda {|school|
    where(school_id: school.id) unless school.nil?
  }

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
    "#{first_name} #{last_name}"
  end
end
