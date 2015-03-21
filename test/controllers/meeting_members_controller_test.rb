require 'test_helper'

class MeetingMembersControllerTest < ActionController::TestCase
  setup do
    @meeting_member = meeting_members(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:meeting_members)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create meeting_member" do
    assert_difference('MeetingMember.count') do
      post :create, meeting_member: { belt_id: @meeting_member.belt_id, meeting_id: @meeting_member.meeting_id, member_id: @meeting_member.member_id, role_id: @meeting_member.role_id }
    end

    assert_redirected_to meeting_member_path(assigns(:meeting_member))
  end

  test "should show meeting_member" do
    get :show, id: @meeting_member
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @meeting_member
    assert_response :success
  end

  test "should update meeting_member" do
    patch :update, id: @meeting_member, meeting_member: { belt_id: @meeting_member.belt_id, meeting_id: @meeting_member.meeting_id, member_id: @meeting_member.member_id, role_id: @meeting_member.role_id }
    assert_redirected_to meeting_member_path(assigns(:meeting_member))
  end

  test "should destroy meeting_member" do
    assert_difference('MeetingMember.count', -1) do
      delete :destroy, id: @meeting_member
    end

    assert_redirected_to meeting_members_path
  end
end
