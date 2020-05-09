import React, { Component } from 'react'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonNote
} from '@ionic/react';
import {
    searchOutline
} from 'ionicons/icons'
import { findItem } from '../utils/api'
import './Maximo.css'
import { saveCurrentWorkOrder } from '../actions/workOrders';

class WoLongDescModal extends Component {


    render() {
        const { showLongDescModal, handleToggleLongDescModal, currentWorkOrder } = this.props


        return (
            <IonModal isOpen={showLongDescModal}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Descripción completa</IonTitle>
                        <ion-buttons slot="end">
                            <ion-button onClick={() => handleToggleLongDescModal(false)}>Cerrar</ion-button>
                        </ion-buttons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12">
                                    
                                        <IonNote style={{textAlign:'justify', borderBottom: 'none'}}>{'description_longdescription' in currentWorkOrder ? currentWorkOrder.description_longdescription.replace(/<[^>]+>/g, '') : 'Descripción no disponible'}</IonNote>
                                    
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                </IonContent>

            </IonModal>
        )
    }
}

export default WoLongDescModal;