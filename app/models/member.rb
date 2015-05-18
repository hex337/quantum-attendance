class Member < ActiveRecord::Base
  belongs_to :belt
  belongs_to :school

  def self.members_for_typeahead
    Member.all.collect do |member|
      {
        id: member.id,
        value: member.full_name,
        belt: member.belt.name,
        school: member.school.name
      }
    end
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
