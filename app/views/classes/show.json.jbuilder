json.jbuilder do |json|
  json.extract! @class, :id, :name, :description, :created_at, :updated_at
  json.url class_url(@class, format: :json)
end
