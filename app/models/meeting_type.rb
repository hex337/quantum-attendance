class MeetingType < ActiveRecord::Base
  def self.meeting_types_for_typeahead
    MeetingType.all.collect do |type|
      {
        id: type.id,
        value: type.name
      }
    end
  end
end
