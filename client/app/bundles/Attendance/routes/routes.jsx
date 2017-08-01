import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../layout/Layout';
import Attendance from '../components/Attendance';
import ClassesContainer from '../containers/ClassesContainer';
import ClassContainer from '../containers/ClassContainer';
import StudentsContainer from '../containers/StudentsContainer';
import StudentContainer from '../containers/StudentContainer';

import AttendanceContainer from '../containers/AttendanceContainer';

export default (
  <Route path="/test" component={Layout}>
    <IndexRoute component={ClassesContainer} />
    <Route path="/test/classes" component={ClassesContainer} />
    <Route path="/test/classes/:classId" component={ClassContainer} />
    <Route path="/test/students" component={StudentsContainer} />
    <Route path="/test/students/:studentId" component={StudentContainer} />
  </Route>
);
