json.array!(@roles) do |role|
  json.extract! role, :id, :name, :comment, :is_active
  json.url role_url(role, format: :json)
end
