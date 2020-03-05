import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonSelect, IonSelectOption, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonTextarea } from '@ionic/react';
import {
    addOutline, peopleOutline, hammerOutline, documentTextOutline, cameraOutline,
    documentAttachOutline, chevronBackOutline, searchOutline
} from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

// Modals
import MaterialModal from './MaterialModal'

class WorkDone extends Component {

    state = {
        showMaterialModal: false,
    }

    handleToggleMaterialModal = (value) => {
        console.log('SHOW_MATERIAL_MODAL')
        this.setState({ showMaterialModal: value })
    }

    render() {
        const { currentWorkOrder, asset } = this.props
        const { showLaborModal, showMaterialModal, showCommentModal } = this.state
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonIcon style={{ fontSize: '28px' }} icon={chevronBackOutline}></IonIcon>
                        </IonButtons>
                        <IonTitle>Reporte de Trabajo Realizado</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol><IonLabel>Indicar Trabajo Realizado</IonLabel></IonCol>
                            </IonRow>
                            <IonRow>
                                <IonTextarea
                                    placeholder="Ingresa la descripción del trabajo realizado...">
                                </IonTextarea>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Seleccionar Activo</IonLabel>
                        <IonSelect value="brown" okText="Okay" cancelText="Dismiss">
                            <IonSelectOption value="">Elemento 1</IonSelectOption>
                            <IonSelectOption value="">Elemento 2</IonSelectOption>
                            <IonSelectOption value="">Elemento 3</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Seleccionar Ubicación</IonLabel>
                        <IonSelect value="brown" okText="Okay" cancelText="Dismiss">
                            <IonSelectOption value="">Elemento 1</IonSelectOption>
                            <IonSelectOption value="">Elemento 2</IonSelectOption>
                            <IonSelectOption value="">Elemento 3</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Seleccionar Tipo de Trabajo</IonLabel>
                        <IonSelect value="brown" okText="Okay" cancelText="Dismiss">
                            <IonSelectOption value="">Elemento 1</IonSelectOption>
                            <IonSelectOption value="">Elemento 2</IonSelectOption>
                            <IonSelectOption value="">Elemento 3</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Seleccionar Prioridad</IonLabel>
                        <IonSelect value="brown" okText="Okay" cancelText="Dismiss">
                            <IonSelectOption value="">Elemento 1</IonSelectOption>
                            <IonSelectOption value="">Elemento 2</IonSelectOption>
                            <IonSelectOption value="">Elemento 3</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Ingresar horas trabajadas</IonLabel>
                    </IonItem>


                    <IonItem>
                        <IonLabel>Ingresar tiempo de inactividad</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol> <IonLabel>Comentarios Adicionales</IonLabel></IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonTextarea
                                        placeholder="Ingresa un comentario adicional...">
                                    </IonTextarea>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Seleccionar código de falla</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol><IonLabel>"Adjuntos":</IonLabel></IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <ion-fab horizontal="end" vertical="bottom" slot="fixed">
                        <ion-fab-button color="dark">
                            <ion-icon style={{ color: 'white' }} icon={addOutline}></ion-icon>
                        </ion-fab-button>
                        <ion-fab-list side="top">

                            <ion-fab-button color="light">
                                <ion-icon icon={documentAttachOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-fab-button color="light">
                                <ion-icon icon={cameraOutline}></ion-icon>
                            </ion-fab-button>

                            <ion-fab-button color="light" onClick={() => this.handleToggleMaterialModal(true)}>
                                <ion-icon icon={hammerOutline}></ion-icon>
                            </ion-fab-button>


                        </ion-fab-list>
                    </ion-fab>

                    {/* Modals */}

                    <MaterialModal handleToggleMaterialModal={this.handleToggleMaterialModal} showMaterialModal={showMaterialModal} />



                </IonContent>
            </IonPage>
        );
    }
};

export default WorkDone;
