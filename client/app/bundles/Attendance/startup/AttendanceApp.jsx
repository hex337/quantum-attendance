import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import * as paths from '../constants/paths';

import routes from '../routes/routes';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const AttendanceApp = (_props, _railsContext) => {
  const { pathname } = _railsContext;
  const store = ReactOnRails.getStore('attendanceStore');
  //const store = configureStore(_props);
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );

  return (
    <Provider store={store}>
      <Router history={history}>
        {routes}
        <NavigationBarContainer />
      </Router>
    </Provider>
  );
};

export default AttendanceApp;
