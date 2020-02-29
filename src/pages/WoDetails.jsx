import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

class WoDetails extends Component {

    render() {
        const { match } = this.props

        return (
            <IonContent>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>00121</IonLabel></IonCol>
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
                            <IonCol><IonLabel>HORNO APV PAN MODELO 25</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>1250</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>HORNEADO PAN2</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>ED2-0-PROD-L01-AS3</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>"CRITERIO:" A</IonLabel></IonCol>
                            <IonCol><IonLabel>"PRIORIDAD:" 1</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel>"TIPO TRABAJO:" MP</IonLabel></IonCol>
                            <IonCol><IonLabel>"DURACIÓN:" 1:00</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>"Inicio programado:" 02/02/2020 14:30</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="8"><IonLabel>"Estado OT:" APPR</IonLabel></IonCol>
                            <IonCol size="4"><IonButton color="light">INICIAR</IonButton></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>"Supervisor:" Pedro Medina Rodriguez</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel>"Planta:" BIMBO Puebla</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>"Riesgos:"</IonLabel></IonCol>
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

export default WoDetails;
