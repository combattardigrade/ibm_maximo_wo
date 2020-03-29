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
import { menuController } from '@ionic/core';

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
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonRow>
              <IonCol size="2"><IonIcon style={{ fontSize: '50px' }} icon={personCircleOutline} /></IonCol>
              <IonCol size="8"><IonListHeader style={{ paddingTop: '10px' }}>{user && user.displayName}</IonListHeader></IonCol>
            </IonRow>
          </IonList>

          <IonList id="labels-list">
            <IonListHeader>Menú</IonListHeader>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('workDone') }}>
              <IonLabel>Reporte de trabajo realizado</IonLabel>
            </IonItem>

            <IonItem lines="none" >
              <IonLabel>Reporte de trabajo a programar</IonLabel>
            </IonItem>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('woSearch') }}>
              <IonLabel>Búsqueda de Órdenes</IonLabel>
            </IonItem>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('inventory') }}>
              <IonLabel>Inventario</IonLabel>
            </IonItem>

            <IonItem lines="none" onClick={e => { e.preventDefault(); this.handlePage('assets') }} >
              <IonLabel>Activos</IonLabel>
            </IonItem>
          </IonList>
          <IonItem lines="none" style={{ position: 'absolute', bottom: '20px' }} onClick={this.handleUserLogout} >
            <IonLabel>Cerrar sesión</IonLabel>
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
