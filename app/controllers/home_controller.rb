require 'csv'

class HomeController < ApplicationController
  def index
  end

  def dashboard
  end

  def attendance_for_all_time
    firstYear = 2014

    #if current_school
    #  firstRecord = Meeting.where(school_id: current_school.id).order(met: :asc).limit(1).first
    #  firstYear = firstRecord.met.to_date.year
    #end

    thisYear = Date.today.year
    @years =* (firstYear..thisYear)
  end

  def attendance_for_year
    @year = params[:year]
    @months = {
      1 => "January",
      2 => "February",
      3 => "March",
      4 => "April",
      5 => "May",
      6 => "June",
      7 => "July",
      8 => "August",
      9 => "September",
      10 => "October",
      11 => "November",
      12 => "December"
    }
  end

  def attendance_for_month
    year = params[:year].to_i
    month = params[:month].to_i
    school_clause = ""

    startTime = DateTime.new(year, month)
    endTime = startTime + 1.month

    if current_school
      school_clause = " AND meetings.school_id = #{current_school.id} "
    end

    attendance = MeetingMember.find_by_sql("
      SELECT members.first_name as first_name, members.last_name as last_name, roles.name as role,
        belts.name as belt_rank, schools.name as school, meetings.met as class_date,
        meeting_types.name as class_type, meetings.comment as comment
      FROM meeting_members
      INNER JOIN members ON (members.id = meeting_members.member_id)
      INNER JOIN meetings ON (meetings.id = meeting_members.meeting_id)
      INNER JOIN meeting_types ON (meetings.meeting_type_id = meeting_types.id)
      INNER JOIN roles ON (meeting_members.role_id = roles.id)
      INNER JOIN belts ON (meeting_members.belt_id = belts.id)
      INNER JOIN schools ON (meetings.school_id = schools.id)
      WHERE meetings.met >= '#{startTime}' AND meetings.met < '#{endTime}' #{school_clause}
    ")

    doHeader = true

    csvInfo = CSV.generate(headers: true) do |csv|
      attendance.each do |row|
        if doHeader
          csv << row.attribute_names
          doHeader = false
        end

        time = row.attributes["class_date"]
        date = DateTime.parse(time.to_s).in_time_zone('America/Los_Angeles')
        formattedDate = date.strftime("%Y-%m-%d %H:%M")
        vals = row.attributes.values
        vals[5] = formattedDate
        csv << vals
      end
    end

    respond_to do |format|
      format.csv { send_data csvInfo, filename: "quantum-attendance-#{year}-#{month}.csv" }
    end
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

    #query = MeetingMember.find_by_sql("
    #  SELECT meeting_members.member_id, count(*)
    #  FROM meeting_members
    #  JOIN meetings ON meeting_members.meeting_id = meetings.id
    #  WHERE meetings.met > (NOW() - INTERVAL '#{days}' DAY)
    #  #{school_statement}
    #  GROUP BY meeting_members.member_id
    #  ORDER BY count(*) DESC
    #")

    query = MeetingMember.find_by_sql("
      SELECT meeting_members.member_id, meeting_members.role_id, count(*)
      FROM meeting_members
      JOIN meetings ON meeting_members.meeting_id = meetings.id
      WHERE meetings.met > (NOW() - INTERVAL '#{days}' DAY)
      #{school_statement}
      GROUP BY meeting_members.member_id, meeting_members.role_id
      ORDER BY count(*) DESC
    ")

    member_counts = {}

    query.each do |row|
      member_counts[row.member_id] = { member: Member.find_by_id(row.member_id), total: 0, Role.student_role.id => 0, Role.teacher_role.id => 0, Role.assistant_role.id => 0 } unless member_counts.key?(row.member_id)

      member_counts[row.member_id][row.role_id] = row.count
      member_counts[row.member_id][:total] += row.count
    end

    @members_and_counts = member_counts.sort_by { |key, row| row[:total] }.reverse
  end

  def people_per_class
    days = @days = params[:days] || 7
    school_statement = current_school ? "AND meetings.school_id = #{current_school.id}" : ''

    query = MeetingMember.find_by_sql("
      SELECT meeting_members.meeting_id, count(*)
      FROM meeting_members
      JOIN meetings ON meeting_members.meeting_id = meetings.id
      WHERE meetings.met > (NOW() - INTERVAL '#{days}' DAY)
      #{school_statement}
      GROUP BY meeting_members.meeting_id
      ORDER BY count(*) DESC
    ")

    meetings_and_counts = query.collect{|row| { meeting: Meeting.find_by_id(row.meeting_id), count: row.count}}
    @meetings_and_counts = meetings_and_counts
  end
end
