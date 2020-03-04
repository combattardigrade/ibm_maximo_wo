import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';
import { checkmarkOutline, closeOutline, addCircleOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

class WoPlanned extends Component {

    render() {

        const { currentWorkOrder, jobPlan } = this.props

        // Check if jobPlan has attributes
        if (!currentWorkOrder || !jobPlan) {
            return <div>Loading...</div>
        }

        return (
            <IonContent>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>{currentWorkOrder.wonum}</IonLabel></IonCol>
                            <IonCol><IonLabel>{currentWorkOrder.targstartdate}</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{currentWorkOrder.description}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{currentWorkOrder.asset.description}</IonLabel>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonItem>

                <IonItem>
                    <IonLabel>Mano de obra:</IonLabel>
                </IonItem>
                {
                    jobPlan.joblabor.map((labor) => (
                        <IonItem lines="full" button detail>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="1">
                                        <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={checkmarkOutline}></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        <IonRow>
                                            <IonCol><IonLabel>{labor.craft}</IonLabel></IonCol>
                                            <IonCol><IonLabel>LaborID: {labor.joblaborid}</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size="12">
                                                <IonLabel>Labor Hrs: {labor.laborhrs}</IonLabel>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                    
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    ))
                }



                <IonItem>
                    <IonLabel>Materiales:</IonLabel>
                </IonItem>

                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="1">
                                <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={closeOutline}></IonIcon>
                            </IonCol>
                            <IonCol>
                                <IonRow> <IonNote>Rodameinto 630102Z Interior 2 Pulgada, exterior 3 Pulgada</IonNote></IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel>100-002-001</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel>"Cantidad:" 2</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel>"Almacen:" ALMC_1062</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

            </IonContent>

        );
    }
};

export default WoPlanned;
