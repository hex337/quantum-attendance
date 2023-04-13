class MeetingMember < ApplicationRecord
  belongs_to :member
  belongs_to :meeting
  belongs_to :belt
  belongs_to :role

  scope :met_after, ->(time) { joins(:meeting).merge(Meeting.met_after(time)) }
  scope :met_between, ->(start_time, end_time) { joins(:meeting).merge(Meeting.met_between(start_time, end_time)) }
  scope :meetings_for_member, ->(member) { where("member_id = ?", member.id) }

  def to_keen_props
    {
      meeting: {
        id: meeting.id,
        pretty_name: meeting.pretty_name,
        day_of_week: meeting.met.strftime('%a'),
        meeting_type: {
          name: meeting.meeting_type.name,
          id: meeting.meeting_type.id
        },
        school: {
          id: meeting.school.id,
          name: meeting.school.name
        }
      },
      member: {
        id: member.id,
        first_name: member.first_name,
        last_name: member.last_name,
        current_belt: {
          id: member.belt.id,
          name: member.belt.name
        }
      },
      keen: {
        timestamp: meeting.met.iso8601
      }
    }
  end
end
