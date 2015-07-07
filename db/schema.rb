# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150707064907) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "belts", force: true do |t|
    t.string   "name"
    t.text     "comment"
    t.boolean  "is_active"
    t.integer  "order_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "meeting_members", force: true do |t|
    t.integer  "meeting_id"
    t.integer  "member_id"
    t.integer  "role_id"
    t.integer  "belt_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "meeting_members", ["belt_id"], name: "index_meeting_members_on_belt_id", using: :btree
  add_index "meeting_members", ["meeting_id"], name: "index_meeting_members_on_meeting_id", using: :btree
  add_index "meeting_members", ["member_id"], name: "index_meeting_members_on_member_id", using: :btree
  add_index "meeting_members", ["role_id"], name: "index_meeting_members_on_role_id", using: :btree

  create_table "meeting_types", force: true do |t|
    t.string   "name"
    t.text     "comment"
    t.boolean  "is_active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "meetings", force: true do |t|
    t.integer  "meeting_type_id"
    t.datetime "met"
    t.text     "comment"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "meetings", ["meeting_type_id"], name: "index_meetings_on_meeting_type_id", using: :btree

  create_table "members", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "belt_id"
    t.integer  "school_id"
    t.text     "comment"
    t.boolean  "is_active"
    t.boolean  "is_teacher"
    t.boolean  "is_kid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "members", ["belt_id"], name: "index_members_on_belt_id", using: :btree
  add_index "members", ["school_id"], name: "index_members_on_school_id", using: :btree

  create_table "roles", force: true do |t|
    t.string   "name"
    t.text     "comment"
    t.boolean  "is_active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schools", force: true do |t|
    t.string   "name"
    t.text     "comment"
    t.boolean  "is_active"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
  end

end
