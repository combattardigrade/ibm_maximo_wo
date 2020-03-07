import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

import { getAsset } from '../utils/api'

class WoDetails extends Component {

    
    

    render() {
        const { match, currentWorkOrder, asset } = this.props
       
        if (!currentWorkOrder || !asset) {
            return <div>Loading</div>
        }
        console.log(currentWorkOrder)
        
        return (
            <IonContent>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>{currentWorkOrder.wonum}</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{currentWorkOrder.description}</IonLabel>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{asset.description}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{currentWorkOrder.assetnum}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>{ 'location' in currentWorkOrder && currentWorkOrder.location.description }</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{ 'location' in currentWorkOrder && currentWorkOrder.location }</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>CRITERIO: {currentWorkOrder.gb_abc}</IonLabel></IonCol>
                            <IonCol><IonLabel>PRIORIDAD: {currentWorkOrder.wopriority}</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel>TIPO TRABAJO: {currentWorkOrder.worktype}</IonLabel></IonCol>
                            <IonCol><IonLabel>DURACIÓN:{currentWorkOrder.estdur.toFixed(2)}</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>Inicio programado: {currentWorkOrder.targstartdate}</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="8"><IonLabel>Estado OT: {currentWorkOrder.status}</IonLabel></IonCol>
                            <IonCol size="4"><IonButton color="light">INICIAR</IonButton></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>Supervisor: {currentWorkOrder.supervisor}</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel>Planta: BIMBO Puebla</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>Riesgos:</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel>Trabajo en altura</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>"Precauciones:"</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel>Contar con permiso de trabajo</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
            </IonContent>

        );
    }
};

function mapStateToProps({ auth, workOrders }) {
    return {
        token: auth.token,
    }
}

export default connect(mapStateToProps)(WoDetails)
