class Role < ActiveRecord::Base
  STUDENT = "Student"
  TEACHER = "Teacher"

  def self.student_role
    @student ||= Role.find_by_name(STUDENT)
  end

  def self.teacher_role
    @teacher ||= Role.find_by_name(TEACHER)
  end

  def self.student_role_id
    @student_id ||= Role.student_role.id
  end

  def self.teacher_role_id
    @teacher_id ||= Role.teacher_role.id
  end
end
