json.array!(@belts) do |belt|
  json.extract! belt, :id, :name, :comment, :is_active, :order_by
  json.url belt_url(belt, format: :json)
end
