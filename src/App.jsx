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


class App extends Component {

  state = {
    selectedPage: '',
    setSelectedPage: ''
  }

  async componentDidMount() {
    const { token, dispatch } = this.props

    let response
    try {
      

      response = await (await getWhoAmI({ token: token })).json()
      if (!('status' in response) || response.status == 'ERROR') {
        console.log(response)        
        return
      }

      dispatch(saveUser(response.payload))


    }
    catch (e) {
      console.log(e)      
      return
    }
  }

  render() {
    const { selectedPage, setSelectedPage } = this.state
    

    return (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu selectedPage={selectedPage}  />
            <IonRouterOutlet id="main">
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/page/:name" render={(props) => {

                return <Page {...props} />;
              }} exact={true} />
              <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
              <Route path="/login" component={Login} />
              <Route path="/wo/:wonum" component={WorkOrder} />
              <Route path="/wo_details" component={WoDetails} />
              <Route path="/workDone" component={WorkDone} />
              <Route path="/assets" component={AssetsList} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    );
  }
};



function mapStateToProps({ auth, workOrders }) {
  return {
      token: auth.token,   

  }
}

export default connect(mapStateToProps)(App)
