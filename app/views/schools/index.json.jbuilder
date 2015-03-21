json.array!(@schools) do |school|
  json.extract! school, :id, :name, :comment, :is_active
  json.url school_url(school, format: :json)
end
