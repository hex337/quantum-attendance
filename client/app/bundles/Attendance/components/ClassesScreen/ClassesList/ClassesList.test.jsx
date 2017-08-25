import React from "react";
import { mount } from "enzyme";
import ClassesList from "./ClassesList";

describe("ClassesList", () => {
  let props;
  let mountedClassesList;
  const classesList = () => {
    if (!mountedClassesList) {
      mountedClassesList = mount(
        <ClassesList {...props} />
      );
    }
    return mountedClassesList;
  };

  beforeEach(() => {
    props = {
      wallpaperPath: undefined,
      userInfoMessage: undefined,
      onUnlocked: undefined,
    };
    mountedClassesList = undefined;
  });

  it("always renders a table", () => {
    const divs = classesList().find("table");
    expect(divs.length).toBeGreaterThan(0);
  });
});