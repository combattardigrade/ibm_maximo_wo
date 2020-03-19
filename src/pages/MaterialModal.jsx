import React, { Component } from 'react'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea
} from '@ionic/react';
import {
    searchOutline
} from 'ionicons/icons'

class MaterialModal extends Component {
    render() {
        const { wonum } = this.props
        
        return (
            <IonModal isOpen={this.props.showMaterialModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Materiales</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonItem lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12"><IonLabel>Almacén</IonLabel>
                                    <IonSelect placeholder="Seleccionar almacén">
                                        <IonSelectOption value="1">Opción 1</IonSelectOption>
                                        <IonSelectOption value="2">Opción 2</IonSelectOption>
                                    </IonSelect>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>Item</IonLabel>
                                    <IonItem>
                                        <IonInput placeholder="Buscar"></IonInput>
                                        <IonButton >
                                            <IonIcon icon={searchOutline}></IonIcon>
                                        </IonButton>
                                    </IonItem>
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12">
                                    <IonLabel>Almacén</IonLabel>
                                    <IonTextarea placeholder="Ingresar descripción..."></IonTextarea>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>Existencia</IonLabel></IonCol>
                                <IonCol size="6"><IonInput placeholder="Ingresar..."></IonInput></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>Estante</IonLabel></IonCol>
                                <IonCol size="6"><IonInput placeholder="Ingresar..."></IonInput></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>Tarea</IonLabel></IonCol>
                                <IonCol size="6"><IonInput placeholder="Ingresar..."></IonInput></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="6"><IonLabel>Cantidad</IonLabel></IonCol>
                                <IonCol size="6"><IonInput placeholder="Ingresar..."></IonInput></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonContent>
                <IonRow>
                    <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleMaterialModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => this.props.handleToggleMaterialModal(false)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}

export default MaterialModal;