import React, { Component } from 'react'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea, IonSpinner
} from '@ionic/react';
import {
    searchOutline
} from 'ionicons/icons'
import { findItem } from '../utils/api'
import './Maximo.css'

class ItemModal extends Component {


    render() {
        const { showItemModal, item, modalLoading } = this.props


        return (
            <IonModal isOpen={showItemModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Refacción {item.itemnum}</IonTitle>
                        <ion-buttons slot="end">
                            <ion-button onClick={() => this.props.handleToggleItemModal(false)}>Cerrar</ion-button>
                        </ion-buttons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {
                        item
                            ?
                            <div>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Código</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{item.itemnum}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{item.itemDetails.description}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Almacén</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{item.location}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Estante</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{item.binnum}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Balance actual</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{item.avblbalance}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Almacén</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{item.siteid}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            </div>
                            :
                            <div className="spinnerCenter">
                                {
                                    modalLoading == true && <IonSpinner name="crescent" style={{ textAlign: 'center' }} />
                                }
                            </div>
                    }

                </IonContent>
                
            </IonModal>
        )
    }
}

export default ItemModal;