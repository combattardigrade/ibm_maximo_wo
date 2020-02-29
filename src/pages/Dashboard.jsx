import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol } from '@ionic/react';

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

class Dashboard extends Component {

    render() {
        const { match } = this.props

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Dashboard</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonRefresher slot="fixed" >
                        <IonRefresherContent
                            pullingIcon="arrow-dropdown"
                            pullingText="Pull to refresh"
                            refreshingSpinner="circles"
                            refreshingText="Refreshing...">
                        </IonRefresherContent>
                    </IonRefresher>
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow >
                                <IonCol size="4">
                                    <IonLabel>00121</IonLabel>
                                </IonCol>
                                <IonCol size="4">
                                    <IonLabel>"TIPO" MP</IonLabel>
                                </IonCol>
                                <IonCol size="4">
                                    <IonLabel>23/02/2020</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="12">MANTENIMIENTO EP HORNO</IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="12">APV PAN CARGADOR MENSUAL</IonCol>
                            </IonRow>
                            <IonRow style={{fontSize:'12px'}}>
                                <IonCol >1250</IonCol>
                                <IonCol >"CRITERIO" A</IonCol>
                            </IonRow>
                            <IonRow style={{fontSize:'12px'}}>
                                <IonCol >HORNEADO DE PAN2</IonCol>
                            </IonRow>
                            <IonRow style={{fontSize:'12px'}}>
                                <IonCol >ED2-0-PROD-L01-AS3</IonCol>
                            </IonRow>
                            <IonRow style={{fontSize:'12px'}}>
                                <IonCol>“DURACIÓN:” 01:00</IonCol>
                                <IonCol>“PRIORIDAD:” 1</IonCol>
                                <IonCol>APPR</IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonContent>
            </IonPage>
        );
    }
};

export default Dashboard;
