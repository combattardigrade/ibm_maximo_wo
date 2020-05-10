import React, { Component } from 'react'
import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonTextarea } from '@ionic/react';
import { checkmarkOutline, closeOutline, addCircleOutline, hourglassOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import WoDetailsHeader from '../components/WODetailsHeader'
import './Page.css';
const moment = require('moment')

class WoActual extends Component {

    render() {
        const { currentWorkOrder, handleToggleMaterialModal, localWorkOrder } = this.props

        return (
            <IonContent>
                <WoDetailsHeader currentWorkOrder={currentWorkOrder} />

                <IonItem lines="full">
                    <IonLabel className="dataTitle">Mano de obra:</IonLabel>
                </IonItem>
                {
                    localWorkOrder && 'laborTransactions' in localWorkOrder
                        ?
                        localWorkOrder.laborTransactions.map((labor, index) => {
                            let start = moment(labor.starttime)
                            let end = moment(labor.finishdatetime)
                            let duration = moment.duration(end.diff(start))
                            let hours = (duration.asHours()).toFixed(2)

                            return (
                                <IonItem lines="full" key={index}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                                <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={checkmarkOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="10">
                                                <IonRow>
                                                    <IonCol size="6">
                                                        <IonLabel className="dataField"><span className="dataSubtitle">Oficio:</span> {'craft' in labor ? labor.person[0].craft : '-'}</IonLabel>
                                                        <IonLabel className="dataField"><span className="dataSubtitle">Duración:</span> {hours ? hours : '0'} hrs</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="4">
                                                        <IonLabel className="dataField"><span className="dataSubtitle">Tarea:</span> {'taskid' in labor ? labor.taskid : '-'}</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            )
                        })
                        : <IonItem><IonLabel className="dataField">No se encontraron registros</IonLabel></IonItem>
                }



                <IonItem>
                    <IonLabel className="dataTitle">Materiales:</IonLabel>
                </IonItem>

                {
                    localWorkOrder && 'materialTransactions' in localWorkOrder ?
                        localWorkOrder.materialTransactions.map((material, index) => (
                            <IonItem lines="full" key={index}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2" style={{ textAlign: 'center' }}>
                                            <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={checkmarkOutline}></IonIcon>
                                        </IonCol>
                                        <IonCol size="10">
                                            <IonRow>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Material:</span> {material.description}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Código:</span> {material.itemnum} </IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Almacén:</span> {material.storelocsite} hrs</IonLabel>
                                                </IonCol>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Cantidad:</span> {material.itemqty}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Cantidad usada:</span> {material.itemqtyused}</IonLabel>
                                                </IonCol>

                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        ))
                        : <IonItem><IonLabel className="dataField">No se encontraron registros</IonLabel></IonItem>

                }

                <IonItem>
                    <IonLabel className="dataTitle">Comentarios:</IonLabel>
                </IonItem>
                <IonItem>
                    <IonGrid>
                        {
                            localWorkOrder && 'comments' in localWorkOrder
                                ?
                                localWorkOrder.comments.map((comment, i) => (
                                    <IonRow key={i}>
                                        <IonCol size="12">
                                            <IonLabel className="dataField">{comment}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                ))
                                :
                                <IonRow><IonCol><IonLabel className="dataField">No se encontraron registros</IonLabel></IonCol></IonRow>
                        }
                    </IonGrid>

                </IonItem>


                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel className="dataTitle">Adjuntos:</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol></IonCol>
                        </IonRow>
                    </IonGrid>

                </IonItem>

            </IonContent >

        );
    }
};

export default WoActual;
