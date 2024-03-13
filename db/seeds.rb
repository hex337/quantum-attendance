# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

order = 0
['white', 'high white', 'yellow', 'high yellow', 'green', 'high green', 'blue', 'high blue', 'red', 'high red', 'black'].each do |belt|
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
  },
  {
    name: "Black Rock City",
    slug: "black-rock-city"
  }
]

schools.each do |school|
  School.create_with(is_active: true).find_or_create_by(name: school[:name], slug: school[:slug])
end

roles = [
  'Student',
  'Teacher',
  'Teaching Assistant'
]

roles.each do |role|
  Role.create_with(is_active: true).find_or_create_by(name: role)
end

students = [
  {
    first_name: "One",
    last_name: "One",
    school: "Seattle",
    belt: "high yellow",
    is_teacher: false,
  },
  {
    first_name: "Two",
    last_name: "Two",
    school: "Seattle",
    belt: "red",
    is_teacher: true,
  },
  {
    first_name: "Three",
    last_name: "Three",
    school: "Seattle",
    belt: "high white",
    is_teacher: false,
  },
  {
    first_name: "Four",
    last_name: "Four",
    school: "San Francisco",
    belt: "high yellow",
    is_teacher: false,
  },
  {
    first_name: "Five",
    last_name: "Five",
    school: "San Francisco",
    belt: "black",
    is_teacher: true,
  }
]

students.each do |student|
  member = Member.create_with(is_active: true, is_teacher: student[:is_teacher]).find_or_create_by(first_name: student[:first_name], last_name: student[:last_name])
  member.belt = Belt.find_by_name(student[:belt])
  member.school = School.find_by_name(student[:school])
  member.save
end

meeting_types = ['Advanced', 'Basics', 'Belt Test', 'Concepts/Spar', 'Conditioning', 'Forms', 'General', 'Grappling', 'Green']

meeting_types.each do |type|
  MeetingType.create_with(is_active: true).find_or_create_by(name: type)
end

school = School.find_by_name('San Francisco')
teacher = Member.find_by_first_name('Five')
one = Member.find_by_first_name('One')
two = Member.find_by_first_name('Two')
three = Member.find_by_first_name('Three')
four = Member.find_by_first_name('Four')
teacher_role = Role.find_by_name('Teacher')
assistant_role = Role.find_by_name('Teaching Assistant')
student_role = Role.find_by_name('Student')

meeting_types.each do |type|
  meeting = Meeting.new(meeting_type: MeetingType.find_by_name(type), met: DateTime.now, school: school)
  meeting.save

  MeetingMember.new(meeting: meeting, member: teacher, role: teacher_role, belt: teacher.belt).save
  MeetingMember.new(meeting: meeting, member: two, role: assistant_role, belt: two.belt).save
  MeetingMember.new(meeting: meeting, member: one, role: student_role, belt: one.belt).save
end
