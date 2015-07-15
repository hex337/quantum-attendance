class HomeController < ApplicationController
  POOR_COUNT = 3

  def index
  end

  def slacker_report
  end

  def poor_attendance
    meetingIds = Meeting.find_by_sql("
      SELECT meeting_id as id, count(*)
      FROM meeting_members
      JOIN meetings ON meeting_members.meeting_id = meetings.id
      WHERE meeting_members.meeting_id = meetings.id
        AND meetings.met > '#{(Time.now - 90.days).to_s(:db)}'
      GROUP BY meeting_id
      HAVING count(*) <= #{POOR_COUNT}
      ORDER BY id DESC
    ")

    @meetings = meetingIds.collect{|meeting| Meeting.find(meeting.id)}

    render 'meetings/index'
  end
end
