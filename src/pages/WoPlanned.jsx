import React, { Component } from 'react'
import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';
import { checkmarkOutline, closeOutline, hourglassOutline, addCircle } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import WoDetailsHeader from '../components/WODetailsHeader'
import './Page.css';
import { parse } from 'url';

class WoPlanned extends Component {

    render() {

        const { currentWorkOrder, handleToggleLaborModal, handleToggleMaterialModal } = this.props

        // Check if jobPlan has attributes
        if (!currentWorkOrder) {
            return (<div>Loading...</div>)
        }


        return (
            <IonContent>
                <WoDetailsHeader currentWorkOrder={currentWorkOrder} />

                <IonItem>
                    <IonLabel className="dataTitle">Mano de obra:</IonLabel>
                </IonItem>
                {
                    'wplabor' in currentWorkOrder ? (
                        currentWorkOrder.wplabor.map((labor) => (
                            <IonItem lines="full" key={labor.wplaborid}>
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
                                                    <IonButton onClick={e => { e.preventDefault(); handleToggleLaborModal(true) }} color="primary" fill="clear"><IonIcon style={{ fontSize: '1.4em' }} icon={addCircle}></IonIcon></IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>

                                </IonGrid>
                            </IonItem>
                        ))
                    )
                        :
                        <IonItem><IonLabel className="dataField">No se encontraron resultados</IonLabel></IonItem>
                }



                <IonItem>
                    <IonLabel className="dataTitle">Materiales:</IonLabel>
                </IonItem>

                {
                    'wpmaterial' in currentWorkOrder ? (
                        currentWorkOrder.wpmaterial.map((material) => (
                            <IonItem lines="full" key={material.wpitemid}>
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
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Código:</span> {material.itemnum}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Almacén:</span> {material.storelocsite}</IonLabel>
                                                </IonCol>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Cantidad:</span> {material.itemqty}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Cantidad usada:</span> {material.itemqtyused}</IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={e => { e.preventDefault(); handleToggleMaterialModal(true, currentWorkOrder.wonum) }} fill="clear" ><IonIcon style={{ fontSize: '1.4em' }} icon={addCircle}></IonIcon></IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>

                                </IonGrid>
                            </IonItem>

                        ))
                    )
                        :
                        <IonItem><IonLabel className="dataField">No se encontraron resultados</IonLabel></IonItem>
                }

            </IonContent>

        );
    }
};

export default WoPlanned;
