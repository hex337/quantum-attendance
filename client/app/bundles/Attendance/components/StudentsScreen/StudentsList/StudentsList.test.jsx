import React from "react";
import { mount } from "enzyme";
import Immutable from 'immutable';
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
      $$students: {
        students: Immutable.Map(),
      }
    };
    mountedStudentsList = undefined;
  });

  it("always renders a table", () => {
    const divs = studentsList().find("table");
    expect(divs.length).toBeGreaterThan(0);
  });
});
