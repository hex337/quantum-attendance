import React from "react";
import { mount } from "enzyme";
import Immutable, { fromJS } from 'immutable';
import { Provider } from 'react-redux'
import ClassScreen from "./ClassScreen";

describe("ClassScreen", () => {
  let props;
  let mountedClassScreen;

  const classScreen = () => {
    if (!mountedClassScreen) {
      mountedClassScreen = mount(
        <ClassScreen {...props} />
      );
    }
    return mountedClassScreen;
  };

  const classes = {
    "1": {
      "id": 1,
      "member_count": 2,
      "comment": "",
      "met": "Wed. Nov 08, 2017",
      "meeting_type": 1,
      "meeting_type_id": 1,
      "students": [1],
    }
  }

  const meeting_types = {
    "1": {
      "id": 1,
      "name": "Advanced",
    }
  }

  const belts = {
    "1": {
      "id": 1,
      "name": "White",
      "is_active": true,
    }
  }

  const students = {
    "1": {
      "id": 1,
      "first_name": "Alex",
      "last_name": "K",
      "is_active": true,
      "is_kid": false,
      "is_teacher": true,
      "belt": 1,
      "belt_id": 1,
      "comment": "",
      "school_id": 1,
    }
  }

  beforeEach(() => {
    props = {
      data: {
        belts: Immutable.Map(
          fromJS(belts)
        ),
        classes: Immutable.Map(
          fromJS(classes)
        ),
        meeting_types: Immutable.Map(
          fromJS(meeting_types)
        ),
        students: Immutable.Map(
          fromJS(students)
        ),
      },
      actions: {},
      location: {},
      params: {
        classId: "1"
      }
    };
    mountedClassScreen = undefined;
  });

  it("always renders the page", () => {
    const divs = classScreen().find(".member_count");
    expect(divs.length).toBe(1);

    expect(classScreen().find(".student-list").length).toBe(1);

    const rows = classScreen().find(".student-list tbody tr");
    expect(rows.length).toBe(1);
  });
});
