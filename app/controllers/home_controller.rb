class HomeController < ApplicationController
  def index
  end

  def slacker_report
    school = params[:school] || nil
    recent_days = params[:min] || 14
    history_days = params[:max] || 90

    school = School.find_by_slug(school) if not school.nil?
    school_statement = school ? "mb.school_id = #{school.id} AND" : ''

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
      WHERE #{school_statement} mb.is_active IS TRUE AND mb.id IN
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
    days = params[:gap] || 90
    threshold = params[:threshold] || 3

    meetingIds = Meeting.find_by_sql("
      SELECT meeting_id as id, count(*)
      FROM meeting_members
      JOIN meetings ON meeting_members.meeting_id = meetings.id
      WHERE meeting_members.meeting_id = meetings.id
        AND meetings.met > (NOW() - INTERVAL '#{days}' DAY)
      GROUP BY meeting_id
      HAVING count(*) <= #{threshold}
      ORDER BY id DESC
    ")

    meetingIds = meetingIds.collect{|meeting| meeting.id}
    @meetings = Meeting.find(meetingIds)

    render 'meetings/index'
  end
end
