require 'test_helper'

class MembersControllerTest < ActionController::TestCase
  setup do
    @member = members(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:members)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create member" do
    assert_difference('Member.count') do
      post :create, member: { belt_id: @member.belt_id, comment: @member.comment, first_name: @member.first_name, is_active: @member.is_active, is_kid: @member.is_kid, is_teacher: @member.is_teacher, last_name: @member.last_name, school_id: @member.school_id }
    end

    assert_redirected_to member_path(assigns(:member))
  end

  test "should show member" do
    get :show, id: @member
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @member
    assert_response :success
  end

  test "should update member" do
    patch :update, id: @member, member: { belt_id: @member.belt_id, comment: @member.comment, first_name: @member.first_name, is_active: @member.is_active, is_kid: @member.is_kid, is_teacher: @member.is_teacher, last_name: @member.last_name, school_id: @member.school_id }
    assert_redirected_to member_path(assigns(:member))
  end

  test "should destroy member" do
    assert_difference('Member.count', -1) do
      delete :destroy, id: @member
    end

    assert_redirected_to members_path
  end
end
