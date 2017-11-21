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
    }
  }

  const meeting_types = {
    "1": {
      "id": 1,
      "name": "Advanced",
    }
  }

  beforeEach(() => {
    props = {
      data: {
        classes: Immutable.Map(
          fromJS(classes)
        ),
        meeting_types: Immutable.Map(
          fromJS(meeting_types)
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
  });
});
