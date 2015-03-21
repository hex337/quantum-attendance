json.array!(@meetings) do |meeting|
  json.extract! meeting, :id, :meeting_type_id, :met, :comment
  json.url meeting_url(meeting, format: :json)
end
