import React, { Component } from 'react'
import {    
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol,  IonIcon,
    IonModal, IonButton, IonInput
} from '@ionic/react';
import {
     searchOutline
} from 'ionicons/icons'

class LaborModal extends Component {
    render() {
        return (
            <IonModal isOpen={this.props.showLaborModal}>
                <IonHeader>
                    <IonToolbar>

                        <IonTitle>Mano de Obra</IonTitle>
                    </IonToolbar>

                    <IonToolbar>
                        <IonRow>
                            <IonCol><IonTitle>Código</IonTitle></IonCol>
                            <IonCol><IonTitle>Descripción</IonTitle></IonCol>
                        </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonInput placeholder="Buscar"></IonInput></IonCol>
                                <IonCol size="6"><IonButton expand="full" >Buscar <IonIcon icon={searchOutline}></IonIcon></IonButton></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>GGONZAMAR</IonLabel></IonCol>
                                <IonCol size="6"><IonLabel>Gabriel Gonzalez Martinez</IonLabel></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>DLOPEROS</IonLabel></IonCol>
                                <IonCol size="6"><IonLabel>David Lopez Rosas</IonLabel></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>GGONZAMAR</IonLabel></IonCol>
                                <IonCol size="6"><IonLabel>Gabriel Gonzalez Martinez</IonLabel></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>DLOPEROS</IonLabel></IonCol>
                                <IonCol size="6"><IonLabel>David Lopez Rosas</IonLabel></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>GGONZAMAR</IonLabel></IonCol>
                                <IonCol size="6"><IonLabel>Gabriel Gonzalez Martinez</IonLabel></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonContent>
                <IonRow>
                    <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleLaborModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => this.props.handleToggleLaborModal(false)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}

export default LaborModal;