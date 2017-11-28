import React from "react";
import { mount } from "enzyme";
import Immutable, { fromJS } from 'immutable';
import { Provider } from 'react-redux'
import StudentsList from "./StudentsList";

describe("StudentsList", () => {
  let props;
  let mountedStudentsList;

  const studentsList = () => {
    if (!mountedStudentsList) {
      mountedStudentsList = mount(
        <StudentsList {...props} />
      );
    }
    return mountedStudentsList;
  };

  beforeEach(() => {
    props = {
      students: Immutable.Map().valueSeq(),
      belts: Immutable.Map(),
    };
    mountedStudentsList = undefined;
  });

  it("always renders a table", () => {
    const divs = studentsList().find("table");
    expect(divs.length).toBeGreaterThan(0);
  });
});
