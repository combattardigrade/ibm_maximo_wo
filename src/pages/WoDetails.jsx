import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import './Maximo.css'


class WoDetails extends Component {




    render() {
        const { currentWorkOrder, safetyDetails } = this.props

        if (!currentWorkOrder) {
            return <div>Loading</div>
        }
       

        return (
            <IonContent>
                {/* WO */}
                <IonItem lines="full" detail button>
                    <IonGrid>
                        <IonRow>
                            <IonCol className="dataTitle">Orden de Trabajo</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel className="dataField">{'wonum' in currentWorkOrder ? currentWorkOrder.wonum : '-'}</IonLabel>
                                <IonLabel className="dataField">{'description' in currentWorkOrder ? currentWorkOrder.description : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                {/* ASSET */}
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol className="dataTitle">Activo</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel className="dataField">{'assetDescription' in currentWorkOrder ? currentWorkOrder.assetDescription : '-'}</IonLabel>
                                <IonLabel className="dataField">{'assetnum' in currentWorkOrder ? currentWorkOrder.assetnum : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol className="dataTitle">Ubicación</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel className="dataField">{'locationDetails' in currentWorkOrder ? currentWorkOrder.locationDetails.locations.description : '-'}</IonLabel>
                                <IonLabel className="dataField">{'location' in currentWorkOrder ? currentWorkOrder.location : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Criterio: </IonLabel>
                                <IonLabel className="dataField">{'gb_abc' in currentWorkOrder ? currentWorkOrder.gb_abc : '-'}</IonLabel>
                            </IonCol>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Prioridad: </IonLabel>
                                <IonLabel className="dataField">{'wopriority' in currentWorkOrder ? currentWorkOrder.wopriority : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Tipo: </IonLabel>
                                <IonLabel className="dataField">{'worktype' in currentWorkOrder ? currentWorkOrder.worktype : '-'}</IonLabel>
                            </IonCol>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Duración: </IonLabel>
                                <IonLabel className="dataField">{'estdur' in currentWorkOrder ? currentWorkOrder.estdur.toFixed(2) : '-'} hrs</IonLabel>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataTitle">Inicio programado</IonLabel>
                                <IonLabel className="dataField">{'targstartdate' in currentWorkOrder ? currentWorkOrder.targstartdate : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Estado OT: </IonLabel>
                                <IonLabel className="dataField">{'status' in currentWorkOrder ? currentWorkOrder.status : '-'}</IonLabel>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton color="light" expand="full">INICIAR</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataTitle">Supervisor</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataField">{'supervisor' in currentWorkOrder ? currentWorkOrder.supervisor : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataTitle">Planta</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataField">{'siteid' in currentWorkOrder ? currentWorkOrder.siteid : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                {
                    safetyDetails && (
                        <div>
                            <IonItem lines="full">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonLabel className="dataTitle">Riesgos</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    {
                                        safetyDetails.map((hazard, i) => (
                                            <IonRow key={i}>
                                                <IonCol>
                                                    <IonLabel className="dataField">{hazard.hazardId} - {hazard.hazardDescription}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        ))
                                    }
                                </IonGrid>
                            </IonItem>
                            <IonItem lines="full">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonLabel className="dataTitle">Precauciones</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    {
                                        safetyDetails.map((hazard, i) => (
                                            <IonRow key={i}>
                                                <IonCol>
                                                    <IonLabel className="dataField">{hazard.precautionId} - {hazard.precautionDescription}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        ))
                                    }
                                </IonGrid>
                            </IonItem>
                        </div>
                    )
                }

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
