import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
  IonCol,
} from '@ionic/react';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, personCircleOutline } from 'ionicons/icons';
import './Menu.css';
import { menuController, } from '@ionic/core';

import {
  shieldCheckmarkOutline, calendarOutline, searchOutline, layersOutline, cubeOutline, logOutOutline
} from 'ionicons/icons'

// Actions
import { userLogout } from '../actions/auth'


class Menu extends Component {
  handlePage = (page) => {

    this.props.history.push(page)
    menuController.close()
    return
  }

  handleUserLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(userLogout())
    this.goToPage('login')
  }

  goToPage = (page) => {
    this.props.history.push(page)
    menuController.close()
    return
  }

  render() {
    const { user } = this.props

    return (
      <IonMenu contentId="main" type="overlay" c>
        <IonContent>
          <IonList id="inbox-list" style={{ width: "100%" }}>
            <IonRow>
              <IonCol style={{ textAlign: 'center' }}><IonIcon color="primary" style={{ fontSize: '6em' }} icon={personCircleOutline} /></IonCol>
            </IonRow>
            <IonRow>
              <IonCol style={{ textAlign: 'center' }}><IonLabel style={{ fontWeight: 'bold' }}>{user && user.displayName}</IonLabel></IonCol>
            </IonRow>
          </IonList>
          <IonList id="labels-list">
            <IonListHeader>Menú</IonListHeader>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('workDone') }}>
              <IonIcon style={{ fontSize: '1.6em', paddingTop: '3px', marginRight: '10px' }} color="primary" icon={shieldCheckmarkOutline}></IonIcon><IonLabel> Reporte de trabajo realizado</IonLabel>
            </IonItem>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('scheduledWork') }}>
              <IonIcon style={{ fontSize: '1.6em', paddingTop: '3px', marginRight: '10px' }} color="primary" icon={calendarOutline}></IonIcon><IonLabel> Reporte de trabajo a programar</IonLabel>
            </IonItem>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('woSearch') }}>
              <IonIcon style={{ fontSize: '1.6em', paddingTop: '3px', marginRight: '10px' }} color="primary" icon={searchOutline}></IonIcon><IonLabel> Búsqueda de Órdenes</IonLabel>
            </IonItem>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('inventory') }}>
              <IonIcon style={{ fontSize: '1.6em', paddingTop: '3px', marginRight: '10px' }} color="primary" icon={layersOutline}></IonIcon><IonLabel> Inventario</IonLabel>
            </IonItem>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('assets') }} >
              <IonIcon style={{ fontSize: '1.6em', paddingTop: '3px', marginRight: '10px' }} color="primary" icon={cubeOutline}></IonIcon><IonLabel> Activos</IonLabel>
            </IonItem>
          </IonList>
          <IonItem lines="none" style={{ position: 'absolute', bottom: '20px' }} onClick={this.handleUserLogout} >
            <IonIcon style={{ fontSize: '1.6em', paddingTop: '3px', marginRight: '10px' }} color="primary" icon={logOutOutline}></IonIcon><IonLabel> Cerrar sesión</IonLabel>
          </IonItem>
        </IonContent>
      </IonMenu>
    );
  }
};
function mapStateToProps({ user }) {
  return {
    user

  }
}
export default withRouter(connect(mapStateToProps)(Menu));
