json.array!(@meeting_members) do |meeting_member|
  json.extract! meeting_member, :id, :meeting_id, :member_id, :role_id, :belt_id
  json.url meeting_member_url(meeting_member, format: :json)
end
