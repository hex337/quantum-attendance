# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_12_10_231847) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "belts", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "comment"
    t.boolean "is_active"
    t.integer "order_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "meeting_members", id: :serial, force: :cascade do |t|
    t.integer "meeting_id"
    t.integer "member_id"
    t.integer "role_id"
    t.integer "belt_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["belt_id"], name: "index_meeting_members_on_belt_id"
    t.index ["meeting_id"], name: "index_meeting_members_on_meeting_id"
    t.index ["member_id", "meeting_id", "role_id"], name: "index_meeting_members_on_member_id_and_meeting_id_and_role_id", unique: true
    t.index ["member_id"], name: "index_meeting_members_on_member_id"
    t.index ["role_id"], name: "index_meeting_members_on_role_id"
  end

  create_table "meeting_types", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "comment"
    t.boolean "is_active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "meetings", id: :serial, force: :cascade do |t|
    t.integer "meeting_type_id"
    t.datetime "met"
    t.text "comment"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "school_id", default: 1
    t.index ["meeting_type_id"], name: "index_meetings_on_meeting_type_id"
    t.index ["met"], name: "index_meetings_on_met"
  end

  create_table "members", id: :serial, force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "belt_id"
    t.integer "school_id"
    t.text "comment"
    t.boolean "is_active"
    t.boolean "is_teacher"
    t.boolean "is_kid"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean "is_quark", default: false
    t.boolean "is_teen", default: false
    t.index ["belt_id"], name: "index_members_on_belt_id"
    t.index ["school_id"], name: "index_members_on_school_id"
  end

  create_table "roles", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "comment"
    t.boolean "is_active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schools", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "comment"
    t.boolean "is_active"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "slug"
  end

end
