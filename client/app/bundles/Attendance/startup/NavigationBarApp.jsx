import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import * as paths from '../constants/paths';

export default (_props, _railsContext) => {
  const { pathname } = _railsContext;
  const store = ReactOnRails.getStore('attendanceStore', false);

  return (
    <Provider store={store}>
      <NavigationBarContainer />
    </Provider>
  );
}
