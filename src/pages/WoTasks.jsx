import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

class WoTasks extends Component {

    render() {
        const { match } = this.props

        return (
            <IonContent>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>00121</IonLabel></IonCol>
                            <IonCol><IonLabel>23/02/2020</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>MANTENIMIENTO EP HORNO</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>APV PAN CARGADOR MENSUAL</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="1">
                                <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={checkmarkOutline}></IonIcon>
                            </IonCol>
                            <IonCol>
                                <IonRow> <IonLabel>"Tarea:"10</IonLabel></IonRow>
                                <IonRow><IonCol size="12"><IonNote>Descripción de la tarea,Descripción de la tarea,Descripción de la tarea,Descripción de la tarea,Descripción de la tarea,</IonNote></IonCol></IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="1">
                                <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={closeOutline}></IonIcon>
                            </IonCol>
                            <IonCol>
                                <IonRow> <IonLabel>"Tarea:"20</IonLabel></IonRow>
                                <IonRow><IonCol size="12"><IonNote>Descripción de la tarea,Descripción de la tarea,Descripción de la tarea,Descripción de la tarea,Descripción de la tarea,</IonNote></IonCol></IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

            </IonContent>

        );
    }
};

export default WoTasks;
