import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';
import { checkmarkOutline, closeOutline, addCircleOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import WoDetailsHeader from '../components/WODetailsHeader'
import './Page.css';

class WoPlanned extends Component {


    render() {

        const { currentWorkOrder, asset, jobPlan } = this.props

        // Check if jobPlan has attributes
        if (!currentWorkOrder) {
            return (<div>Loading...</div>)
        }


        return (
            <IonContent>
                <WoDetailsHeader currentWorkOrder={currentWorkOrder} />

                <IonItem>
                    <IonLabel>Mano de obra:</IonLabel>
                </IonItem>
                {
                    'wplabor' in currentWorkOrder && (
                        currentWorkOrder.wplabor.map((labor) => (
                            <IonItem lines="full" button detail key={labor.wplaborid}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="1">
                                            <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={checkmarkOutline}></IonIcon>
                                        </IonCol>
                                        <IonCol>
                                            <IonRow>
                                                <IonCol><IonLabel>{labor.craft}</IonLabel></IonCol>
                                                <IonCol><IonLabel>LaborCode: {labor.laborcode}</IonLabel></IonCol>
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
                    )
                }



                <IonItem>
                    <IonLabel>Materiales:</IonLabel>
                </IonItem>

                {
                    'wpmaterial' in currentWorkOrder && (
                        currentWorkOrder.wpmaterial.map((material) => (
                            <IonItem button detail key={material.wpitemid}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="1">
                                            <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={closeOutline}></IonIcon>
                                        </IonCol>
                                        <IonCol>
                                            <IonRow> <IonNote>{material.description}</IonNote></IonRow>
                                            <IonRow>
                                                <IonCol size="12">
                                                    <IonLabel>{material.itemnum}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size="12">
                                                    <IonLabel>Cantidad: {material.itemqty}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size="12">
                                                    <IonLabel>Almacen: {material.storelocsite}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        ))
                    )
                }

            </IonContent>

        );
    }
};

export default WoPlanned;
