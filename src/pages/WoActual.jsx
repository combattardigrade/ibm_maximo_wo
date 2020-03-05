import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonTextarea } from '@ionic/react';
import { checkmarkOutline, closeOutline, addCircleOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
const moment = require('moment')

class WoActual extends Component {

    render() {
        const { currentWorkOrder, asset } = this.props

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
                                <IonLabel>{asset && asset.description}</IonLabel>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonItem>

                <IonItem>
                    <IonLabel>"Mano de obra":</IonLabel>
                </IonItem>

                {
                    currentWorkOrder && 'labtrans' in currentWorkOrder
                        ?
                        currentWorkOrder.labtrans.map((labor) => {
                            let start = moment(labor.starttime)
                            let end = moment(labor.finishdatetime)
                            let duration = moment.duration(end.diff(start))
                            let hours = (duration.asHours()).toFixed(2)

                            return (
                                < IonItem lines="full" key={labor.labtransid} >
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="1">
                                                <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={checkmarkOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol>
                                                <IonRow>
                                                    <IonCol><IonLabel>{labor.craft}</IonLabel></IonCol>
                                                    <IonCol><IonLabel></IonLabel></IonCol>
                                                </IonRow>
                                                <IonRow>
                                                    <IonCol size="12">
                                                        <IonLabel>Duración: {hours} horas</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>

                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            )
                        })
                        :
                        <IonItem><IonLabel>No se encontraron registros</IonLabel></IonItem>
                }

                

                <IonItem>
                    <IonLabel>Materiales:</IonLabel>
                </IonItem>

                {
                    currentWorkOrder && 'matusetrans' in currentWorkOrder
                        ?
                        currentWorkOrder.matusetrans.map((material) => (
                            <IonItem key={material.matusetransid}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="1">
                                            <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={closeOutline}></IonIcon>
                                        </IonCol>
                                        <IonCol size="11">
                                            <IonRow> <IonLabel>{material.description}</IonLabel></IonRow>
                                            <IonRow>
                                                <IonCol size="12">
                                                    <IonLabel>{material.itemnum}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size="12">
                                                    <IonLabel>Cantidad: {material.quantity}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size="12">
                                                    <IonLabel>Almacen: {material.storeloc}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        ))
                        :
                        <IonItem><IonLabel>No se encontraron registros</IonLabel></IonItem>
                }


                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>Comentarios:</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonTextarea
                                placeholder="Ingresar comentarios...">
                            </IonTextarea></IonCol>
                        </IonRow>
                    </IonGrid>

                </IonItem>
                

                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>Adjuntos:</IonLabel></IonCol>
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
