import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea, IonAlert
} from '@ionic/react';
import {
    searchOutline
} from 'ionicons/icons'

import { saveComment } from '../actions/localWorkOrders'

class CommentModal extends Component {

    state = {
        showAlert: false,
        alertTitle: '',
        alertMsg: '',
        comments: ''
    }

    handleCommentChange = (e) => this.setState({ comments: e.target.value })

    handleSubmitComments = (e) => {
        e.preventDefault()

        const { comments } = this.state
        const { currentWorkOrder, dispatch } = this.props

        if (!comments) {
            this.showAlert('Ingresa todos los campos requeridos', 'Error')
            return
        }

        const comment = {
            comment: comments,
            wonum: currentWorkOrder.wonum
        }
       
        dispatch(saveComment(comment))
        this.props.handleToggleCommentModal(false)
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    render() {
        return (
            <IonModal isOpen={this.props.showCommentModal}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Comentario Adicional</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonItem lines="none">
                        <IonTextarea
                            placeholder="Ingresa un comentario adicional..."
                            onIonChange={this.handleCommentChange}
                            value={this.state.comments}
                        >
                        </IonTextarea>
                    </IonItem>


                </IonContent>
                <IonRow>
                    <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleCommentModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={this.handleSubmitComments}>Aceptar</IonButton></IonCol>
                </IonRow>

                <IonAlert
                    isOpen={this.state.showAlert}
                    header={this.state.alertTitle}
                    message={this.state.alertMsg}
                    buttons={[{
                        text: 'OK',
                        handler: () => {
                            this.setState({ showAlert: false })
                        }
                    }]}
                />
            </IonModal>
        )
    }
}

function mapStateToProps({ auth, locations, workOrders }) {
    return {
        token: auth.token,
        locations: locations,
        currentWorkOrder: workOrders && workOrders.currentWorkOrder
    }
}

export default connect(mapStateToProps)(CommentModal)
