json.array!(@members) do |member|
  json.extract! member, :id, :first_name, :last_name, :belt_id, :school_id, :comment, :is_active, :is_teacher, :is_kid
  json.url member_url(member, format: :json)
end
