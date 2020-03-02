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

class CommentModal extends Component {
    render() {
        return (
            <IonModal isOpen={this.props.showCommentModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Comentario Adicional</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonItem lines="none">
                        <IonTextarea                            
                            placeholder="Ingresa un comentario adicional...">
                        </IonTextarea>
                    </IonItem>


                </IonContent>
                <IonRow>
                    <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleCommentModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => this.props.handleToggleCommentModal(false)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}

export default CommentModal;