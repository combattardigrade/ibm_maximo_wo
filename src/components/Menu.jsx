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



class Menu extends Component {
  render() {
    const { user } = this.props
    
    
    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonRow>
              <IonCol size="2"><IonIcon style={{ fontSize: '50px' }} icon={personCircleOutline} /></IonCol>
              <IonCol size="8"><IonListHeader style={{ paddingTop: '10px' }}>{ user && user.displayName}</IonListHeader></IonCol>
            </IonRow>
          </IonList>

          <IonList id="labels-list">
            <IonListHeader>Menú</IonListHeader>

            <IonItem lines="none" >

              <IonLabel>Reporte de trabajo realizado</IonLabel>
            </IonItem>

            <IonItem lines="none" >

              <IonLabel>Reporte de trabajo a programar</IonLabel>
            </IonItem>

            <IonItem lines="none" >

              <IonLabel>Búsqueda de Órdenes</IonLabel>
            </IonItem>

            <IonItem lines="none" >

              <IonLabel>Inventario</IonLabel>
            </IonItem>

            <IonItem lines="none" >

              <IonLabel>Activos</IonLabel>
            </IonItem>

          </IonList>
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
export default withRouter( connect(mapStateToProps)(Menu));
