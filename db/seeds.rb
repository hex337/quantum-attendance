# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

order = 0
['White', 'High White', 'Yellow', 'High Yellow', 'Green', 'High Green', 'Blue', 'High Blue', 'Red', 'High Red', 'Black'].each do |belt|
  order = order + 1
  Belt.create_with(is_active: true, order_by: order).find_or_create_by(name: belt)
end

schools = [
  {
    name: "Seattle",
    slug: "seattle"
  },
  {
    name: "San Francisco",
    slug: "san-francisco"
  }
]

schools.each do |school|
  School.create_with(is_active: true).find_or_create_by(name: school[:name], slug: school[:slug])
end

students = [
  {
    first_name: "Alex",
    last_name: "Kleissner",
    school: "Seattle",
    belt: "High Yellow"
  },
  {
    first_name: "Tony",
    last_name: "Evans",
    school: "Seattle",
    belt: "Red"
  },
  {
    first_name: "Derrick",
    last_name: "Louie",
    school: "Seattle",
    belt: "High White"
  },
  {
    first_name: "Anthony",
    last_name: "Hernandez",
    school: "San Francisco",
    belt: "High Yellow"
  },
  {
    first_name: "Rachel",
    last_name: "Evans",
    school: "San Francisco",
    belt: "Black"
  }
]

students.each do |student|
  member = Member.create_with(is_active: true).find_or_create_by(first_name: student[:first_name], last_name: student[:last_name])
  if student[:last_name] == "Evans"
    member.is_teacher = true
  end
  member.belt = Belt.find_by_name(student[:belt])
  member.school = School.find_by_name(student[:school])
  member.save
end

meeting_types = ['Advanced', 'Basics', 'Belt Test', 'Concepts/Spar', 'Conditioning', 'Forms', 'General', 'Grappling', 'Green']

meeting_types.each do |type|
  MeetingType.create_with(is_active: true).find_or_create_by(name: type)
end

roles = ["Student", "Teacher", "Teaching Assistant"]
roles.each do |role|
  Role.create_with(is_active: true).find_or_create_by(name: role)
end

# Create a few classes so that we have something there
meeting_types.each do |type|
  school = School.find_by_slug("san-francisco")
  mt = MeetingType.find_by_name(type)
  meeting = Meeting.create_with(meeting_type_id: mt.id, school_id: school.id).find_or_create_by(met: Time.now)
  meeting.save

  # add instructor
  inst = Member.find_by_first_name("Rachel")
  ir = Role.find_by_name("Teacher")
  mm = MeetingMember.find_or_create_by(meeting_id: meeting.id, member_id: inst.id, role_id: ir.id, belt_id: inst.belt.id)
  mm.save

  stu = Member.find_by_last_name("Hernandez")
  sr = Role.find_by_name("Student")
  mm = MeetingMember.find_or_create_by(meeting_id: meeting.id, member_id: stu.id, role_id: ir.id, belt_id: stu.belt.id)
  mm.save
end
