class HomeController < ApplicationController
  POOR_COUNT = 3

  def index
  end

  def slacker_report
    history_days = 90
    recent_days = 14

    memberIds = Member.find_by_sql("
      SELECT DISTINCT m3.id
      FROM meetings m1
      INNER JOIN meeting_members m2 ON m1.id = m2.meeting_id
      INNER JOIN members m3 on m2.member_id = m3.id
      WHERE m1.met > '#{(Time.now - history_days.days).to_s(:db)}' 
        AND m3.id NOT IN
        (
          SELECT DISTINCT m6.id
          FROM meetings m4
          INNER JOIN meeting_members m5 ON m4.id = m5.meeting_id
          INNER JOIN members m6 ON m5.member_id = m6.id
          WHERE m1.met > '#{(Time.now - recent_days.days).to_s(:db)}'
        )
    ")

    memberIds = memberIds.collect{|mem| mem.id}
    @members = Member.find(memberIds)

    render 'members/index'
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

    meetingIds = meetingIds.collect{|meeting| meeting.id}
    @meetings = Meeting.find(meetingIds)

    render 'meetings/index'
  end
end
