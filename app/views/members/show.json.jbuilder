json.extract! @member, :id, :first_name, :last_name, :belt_id, :school_id, :comment, :is_active, :is_teacher, :is_kid, :created_at, :updated_at

json.belt do
  json.extract! @member.belt, :id, :name
end
