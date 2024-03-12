require 'rails_helper'

RSpec.describe 'Meeting List View', type: :view do
  describe 'Student count display' do
    it 'displays the correct count for a class with students and one teacher' do
      teacher = create(:user, role: 'teacher')
      students = create_list(:user, 5, role: 'student')
      meeting = create(:meeting, members: students + [teacher])

      render partial: 'meetings/meeting_list', locals: { meetings: [meeting] }

      expect(rendered).to have_selector("td", text: "5")
    end

    it 'displays the correct count for a class with a teacher, assistants, and students' do
      teacher = create(:user, role: 'teacher')
      assistants = create_list(:user, 2, role: 'assistant')
      students = create_list(:user, 8, role: 'student')
      meeting = create(:meeting, members: students + [teacher] + assistants)

      render partial: 'meetings/meeting_list', locals: { meetings: [meeting] }

      expect(rendered).to have_selector("td", text: "8")
    end
  end
end