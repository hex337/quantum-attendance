import ReactOnRails from 'react-on-rails';

import AttendanceApp from './AttendanceApp';

import attendanceStore from '../store/attendanceStore';

// This is how react_on_rails can see the Attendance in the browser.
ReactOnRails.register({
  AttendanceApp,
});

ReactOnRails.registerStore({
  attendanceStore
});
