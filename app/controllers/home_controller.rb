class HomeController < ApplicationController
  def index
  end

  def slacker_report
    recent_days = @min = params[:min] || 14
    history_days = @max = params[:max] || 90

    school_statement = current_school ? "mb.school_id = #{current_school.id} AND" : ''

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
  end

  def poor_attendance
    days = @gap = params[:gap] || 90
    threshold = @threshold = params[:threshold] || 3

    school_statement = current_school ? "AND meetings.school_id = #{current_school.id}" : ''

    meetingIds = Meeting.find_by_sql("
      SELECT meeting_id as id, count(*)
      FROM meeting_members
      JOIN meetings ON meeting_members.meeting_id = meetings.id
      WHERE meeting_members.meeting_id = meetings.id
        AND meetings.met > (NOW() - INTERVAL '#{days}' DAY)
        #{school_statement}
      GROUP BY meeting_id
      HAVING count(*) <= #{threshold}
      ORDER BY id DESC
    ")

    meetingIds = meetingIds.collect{|meeting| meeting.id}
    @meetings = Meeting.find(meetingIds)
  end

  def classes_per_student
    days = @days = params[:days] || 7
    school_statement = current_school ? "AND meetings.school_id = #{current_school.id}" : ''

    query = MeetingMember.find_by_sql("
      SELECT meeting_members.member_id, count(*)
      FROM meeting_members
      JOIN meetings ON meeting_members.meeting_id = meetings.id
      WHERE meetings.met > (NOW() - INTERVAL '#{days}' DAY)
      #{school_statement}
      GROUP BY meeting_members.member_id
      ORDER BY count(*) DESC
    ")

    memberAndCounts = query.collect{|row| { member: Member.find_by_id(row.member_id), count: row.count}}
    @members_and_counts = memberAndCounts
  end

  def people_per_class
  end
end
