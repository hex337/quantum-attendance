import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../layout/Layout';
import Attendance from '../components/Attendance';
import ClassScreen from '../components/ClassScreen/ClassScreen';
import StudentScreen from '../components/StudentScreen/StudentScreen';

import AttendanceContainer from '../containers/AttendanceContainer';

export default (
  <Route path="/test" component={Layout}>
    <IndexRoute component="AttendanceContainer" />
    <Route path="/test/classes" component={ClassesContainer} />
    <Route path="/test/students" component={StudentScreen} />
  </Route>
);
