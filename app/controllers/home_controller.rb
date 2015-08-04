class HomeController < ApplicationController
  POOR_COUNT = 3

  def index
  end

  def slacker_report
    history_days = 90
    recent_days = 14

    memberIds = Member.find_by_sql("
      SELECT distinct mb.id, maxmet
      FROM members mb
      INNER JOIN
      (
        SELECT mm.member_id, max(mt.met) as maxmet
        FROM meeting_members mm
        INNER JOIN meetings mt on mm.meeting_id = mt.id
        GROUP BY mm.member_id
      ) mm2 ON mb.Id = mm2.member_id
      WHERE mb.id IN
      (
        SELECT distinct member_id
        FROM meeting_members mm
        INNER JOIN meetings m ON mm.meeting_id = m.id
        WHERE met > (NOW() - INTERVAL '#{history_days}' DAY)
      )
      AND mb.id NOT IN
      (
        SELECT distinct member_id
        FROM meeting_members mm
        INNER JOIN meetings m ON mm.meeting_id = m.id
        WHERE met > (NOW() - INTERVAL '#{recent_days}' DAY)
      ) ORDER BY maxmet;
   ")

   memberIds = memberIds.collect{|mem| mem.id}
    @members = Member.find(memberIds)

    render 'members/index'
  end

  def poor_attendance
    days = 90

    meetingIds = Meeting.find_by_sql("
      SELECT meeting_id as id, count(*)
      FROM meeting_members
      JOIN meetings ON meeting_members.meeting_id = meetings.id
      WHERE meeting_members.meeting_id = meetings.id
        AND meetings.met > (NOW() - INTERVAL '#{days}' DAY)
      GROUP BY meeting_id
      HAVING count(*) <= #{POOR_COUNT}
      ORDER BY id DESC
    ")

    meetingIds = meetingIds.collect{|meeting| meeting.id}
    @meetings = Meeting.find(meetingIds)

    render 'meetings/index'
  end
end
