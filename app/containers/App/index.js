import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import { ThemeContext } from './ThemeWrapper';
import ThemeWrapper from './ThemeWrapper';
import Outer from '../Templates/Outer';
import Dashboard from '../Templates/Dashboard';
import { Redirect } from 'react-router';
import { Earnings, LoginV2, OtpVerification, Settlements } from '../pageListAsync';
import AccountAndSettings from '../Pages/AccountSettings/AccountAndSettings';
import DashboardData from '../Pages/DashboardData';
import ScansData from '../Pages/ScansData';
import ViewData from '../Pages/ViewData';


window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          <Route path="/login">
            <Outer>
              <LoginV2 />
            </Outer>
          </Route>
          <Route path="/verify-otp">
            <Outer>
              <OtpVerification />
            </Outer>
          </Route>
          <Route path="/dashboard">
            <Outer>
              <Dashboard history={history} changeMode={changeMode}><DashboardData /></Dashboard>
            </Outer>
          </Route>
          <Route path="/redeems">
            <Outer>
              <Dashboard history={history} changeMode={changeMode}>
                <Earnings />
              </Dashboard>
            </Outer>
          </Route>
          <Route path="/settlements">
            <Outer>
              <Dashboard history={history} changeMode={changeMode}>
                <Settlements />
              </Dashboard>
            </Outer>
          </Route>
          <Route path="/scans" exact>
            <Outer>
              <Dashboard history={history} changeMode={changeMode}>
                <ScansData />
              </Dashboard>
            </Outer>
          </Route>
          <Route path="/scans/scan-details" exact>
            <Outer>
              <Dashboard history={history} changeMode={changeMode}>
                <ViewData />
              </Dashboard>
            </Outer>
          </Route>
          <Route path="/account-and-settings">
            <Outer>
              <Dashboard history={history} changeMode={changeMode}>
                <AccountAndSettings />
              </Dashboard>
            </Outer>
          </Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeWrapper>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
