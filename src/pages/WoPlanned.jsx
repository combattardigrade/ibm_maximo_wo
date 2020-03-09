import React, { Component } from 'react'
import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';
import { checkmarkOutline, closeOutline, hourglassOutline, addCircleOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import WoDetailsHeader from '../components/WODetailsHeader'
import './Page.css';
import { parse } from 'url';

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
                            <IonItem lines="full"  key={labor.wplaborid}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2" style={{ textAlign: 'center' }}>
                                            {
                                                parseInt(labor.laborhrscompleted) >= parseInt(labor.laborhrs)
                                                    ?
                                                    <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={checkmarkOutline}></IonIcon>
                                                    :
                                                    <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={hourglassOutline} />
                                            }
                                        </IonCol>
                                        <IonCol>
                                            <IonRow>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Oficio:</span> {labor.craft}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Duración:</span> {labor.laborhrs} hrs</IonLabel>
                                                </IonCol>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Tarea:</span> {labor.taskid}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Completado:</span> {labor.laborhrscompleted} hrs</IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton fill="clear" style={{ height: '100%', width: '100%' }}><IonIcon style={{ fontSize: '28px',  }} icon={addCircleOutline}></IonIcon></IonButton>
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
                            <IonItem lines="full"  key={material.wpitemid}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2" style={{ textAlign: 'center' }}>
                                            {
                                                parseInt(material.itemqtyused) >= parseInt(material.itemqty)
                                                    ?
                                                    <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={checkmarkOutline}></IonIcon>
                                                    :
                                                    <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={hourglassOutline} />
                                            }
                                        </IonCol>
                                        <IonCol>
                                            <IonRow>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Material:</span> {material.description}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Código:</span> {material.itemnum} hrs</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Almacén:</span> {material.storelocsite} hrs</IonLabel>
                                                </IonCol>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Cantidad:</span> {material.itemqty}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Cantidad usada:</span> {material.itemqtyused}</IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton fill="clear" style={{ height: '100%', width: '100%' }}><IonIcon style={{ fontSize: '28px',  }} icon={addCircleOutline}></IonIcon></IonButton>
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
