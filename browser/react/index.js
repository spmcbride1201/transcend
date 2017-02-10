import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App';
import Sean from './components/Sean';
import Beth from './components/Beth';
import Yoonah from './components/Yoonah';
import Joey from './components/Joey';
import Lobby from './components/Lobby';
import Home from './components/Login/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import SOCKET from '../socket';
import { logout, whoami } from '../redux/reducers/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Dispatch whoami to set the user whenever you hit the home page
// Primary purpose right now is to set user right after local/OAuth login
const onHomeEnter = () => {
  if (store.getState().auth.id) browserHistory.push('/vr');
  store.dispatch(whoami())
    .then(() => {
      let id = store.getState().auth.id;
      if (id) browserHistory.push('/vr');
    });
};

const confirmLogin = () => {
  if (store.getState().auth.id) return;
  store.dispatch(whoami())
    .then(() => {
      let id = store.getState().auth.id;
      if (id) return;
      browserHistory.push('/');
    });
};

const bye = () => {
  store.dispatch(logout())
    .then(() => browserHistory.push('/'));
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" onEnter={onHomeEnter} >
          <IndexRedirect to="/home" />
          <Route path="/home" component={Home}>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Route>
          <Route path="/logout" onEnter={bye} />
          <Route path="/vr" component={App} onEnter={confirmLogin}>
            <IndexRedirect to="lobby" />
            <Route path="lobby" component={Lobby} />
            <Route path="sean" component={Sean} />
            <Route path="beth" component={Beth} />
            <Route path="yoonah" component={Yoonah} />
            <Route path="joey" component={Joey} />
          </Route>
        </Route>
    </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-app')
);
