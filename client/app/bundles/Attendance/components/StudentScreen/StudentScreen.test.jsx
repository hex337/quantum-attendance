import React from "react";
import { mount } from "enzyme";
import Immutable, { fromJS } from 'immutable';
import { Provider } from 'react-redux'
import StudentScreen from "./StudentScreen";

describe("StudentScreen", () => {
  let props;
  let mountedStudentScreen;

  const studentScreen = () => {
    if (!mountedStudentScreen) {
      mountedStudentScreen = mount(
        <StudentScreen {...props} />
      );
    }
    return mountedStudentScreen;
  };

  const students = {
    "1": {
      "first_name": "Alex",
      "last_name": "K",
      "id": 1,
      "belt": 1,
      "belt_id": 1,
      "is_active": true,
      "is_kid": false,
      "is_teacher": true,
      "school_id": 1,
    }
  }

  beforeEach(() => {
    props = {
      data: {
        students: Immutable.Map(
          fromJS(students)
        ),
        belts: Immutable.Map(),
      },
      actions: {},
      location: {},
      params: {
        studentId: "1"
      }
    };
    mountedStudentScreen = undefined;
  });

  it("always renders the page", () => {
    const divs = studentScreen().find(".student-name");
    expect(divs.length).toBe(1);
  });
});
