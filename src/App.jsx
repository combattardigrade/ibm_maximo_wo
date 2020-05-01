import Menu from './components/Menu';
import Page from './pages/Page';
import React, { Component } from 'react'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import WorkOrder from './pages/WorkOrder'
import WoDetails from './pages/WoDetails'
import WorkDone from './pages/WorkDone'

import { getWhoAmI } from './utils/api'
import { saveUser } from './actions/user'
import AssetsList from './pages/AssetsList';
import Inventory from './pages/Inventory'
import WoSearch from './pages/WoSearch'
import ScheduledWork from  './pages/ScheduledWork'

class App extends Component {

  state = {
    selectedPage: '',
    setSelectedPage: ''
  }

  async componentDidMount() {
    const { token, dispatch } = this.props


  }

  render() {
    const { selectedPage, setSelectedPage } = this.state
    const { auth } = this.props

    return (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu selectedPage={selectedPage} />
            <IonRouterOutlet id="main">
              <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
              <Route path="/login" component={Login} />
              <PrivateRoute path='/dashboard' component={Dashboard} auth={auth} />
              <PrivateRoute path="/wo/:wonum" component={WorkOrder} auth={auth} />
              <PrivateRoute path="/wo_details" component={WoDetails} auth={auth} />
              <PrivateRoute path="/workDone" component={WorkDone} auth={auth} />
              <PrivateRoute path="/woSearch" component={WoSearch} auth={auth} />
              <PrivateRoute path="/assets" component={AssetsList} auth={auth} />
              <PrivateRoute path="/inventory" component={Inventory} auth={auth} />
              <PrivateRoute path='/workDone' component={WorkDone} auth={auth} />
              <PrivateRoute path='/scheduledWork' component={ScheduledWork} auth={auth} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    );
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = rest
  return (
    <Route
      {...rest}
      render={props =>
        auth !== null ? (
          <Component {...props} />
        )
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { logout: true } 
              }}
            />
          )
      }
    />
  )
}

function mapStateToProps({ auth }) {
  return {
    auth

  }
}

export default connect(mapStateToProps)(App)
