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
import DoctorSignup from '../Pages/DoctorSignup';
import ConsultationData from '../Pages/ConsultationData';
import ConsultationDetails from '../Pages/ConsultationDetails';
import PrescriptionData from '../Pages/PrescriptionData';
import PatientLogin from '../Pages/PatientLogin';
import Doctors from '../Pages/Doctors';
import PatientSignup from '../Pages/PatientSignup';
import ConsultationForm from '../Pages/ConsultationForm';
import MyConsultations from '../Pages/MyConsultations';
import MyPrescriptions from '../Pages/MyPrescriptions';
import DoctorProfile from '../Pages/DoctorProfile';
import PatientProfile from '../Pages/PatientProfile';


window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          {/* <Route path="/login">
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
            <Redirect to="/redeems" />
          </Route> */}

          <Route path="/doctor/login">
  <Outer>
    <LoginV2 />
  </Outer>
</Route>

<Route path="/patient/login">
  <Outer>
    <PatientLogin />
  </Outer>
</Route>

<Route path="/doctor/signup">
  <Outer>
    <DoctorSignup />
  </Outer>
</Route>

<Route path="/patient/signup">
  <Outer>
    <PatientSignup />
  </Outer>
</Route>

<Route path="/dashboard">
  <Outer>
    <Dashboard history={history} changeMode={changeMode}>
      <DashboardData />
    </Dashboard>
  </Outer>
</Route>

<Route path="/doctors">
  <Outer>
    <Dashboard history={history} changeMode={changeMode}>
      <Doctors />
    </Dashboard>
  </Outer>
</Route>

<Route
  path="/consult/:doctorId"
>
  <Outer>
    <Dashboard
      history={history}
      changeMode={changeMode}
    >

      <ConsultationForm />

    </Dashboard>
  </Outer>
</Route>

<Route path="/my-consultations">

  <Outer>

    <Dashboard
      history={history}
      changeMode={changeMode}
    >

      <MyConsultations />

    </Dashboard>

  </Outer>

</Route>

<Route path="/my-prescriptions">

  <Outer>

    <Dashboard
      history={history}
      changeMode={changeMode}
    >

      <MyPrescriptions />

    </Dashboard>

  </Outer>

</Route>

<Route path="/consultations">
  <Outer>
    <Dashboard history={history} changeMode={changeMode}>
      <ConsultationData />
    </Dashboard>
  </Outer>
</Route>

<Route path="/prescriptions">
  <Outer>
    <Dashboard history={history} changeMode={changeMode}>
      <PrescriptionData />
    </Dashboard>
  </Outer>
</Route>

<Route path="/doctor/profile">
  <Outer>
    <Dashboard history={history} changeMode={changeMode}>
      <DoctorProfile />
    </Dashboard>
  </Outer>
</Route>


<Route path="/patient/profile">
  <Outer>
    <Dashboard history={history} changeMode={changeMode}>
      <PatientProfile />
    </Dashboard>
  </Outer>
</Route>

<Route
  path="/consultation-details/:id"
>
  <Outer>
    <Dashboard history={history} changeMode={changeMode}>
      <ConsultationDetails />
    </Dashboard>
  </Outer>
</Route>

{/* <Route exact path="/">
  <Redirect to="/dashboard" />
</Route> */}

<Route exact path="/">

  <Redirect

    to={

      localStorage.getItem("role")
        === "doctor"

        ? "/dashboard"

        : localStorage.getItem("role")
            === "patient"

            ? "/doctors"

            : "/login"

    }

  />

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
