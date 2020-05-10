import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea, IonAlert
} from '@ionic/react';
import {
    micCircleOutline
} from 'ionicons/icons'

// Actions
import { saveComment } from '../actions/localWorkOrders'

// Plugins
import { SpeechRecognition } from '@ionic-native/speech-recognition'

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

    handleCommentsSpeech = async (e) => {
        e.preventDefault()
        console.log('COMMENTS_SPEECH_RECOGNITION')

        // Check if another speech recognition process is active
        // if (this.state.descriptionRecognitionActive === true || this.state.commentsRecognitionActive === true) {
        //     this.showAlert('Otro proceso de reconocimiento de voz se encuentra activo', 'Error')
        //     return
        // }

        // Check if feature is available
        const available = await SpeechRecognition.isRecognitionAvailable()

        if (!available) {
            this.showAlert('Reconocimiento de voz no disponible en el dispositivo', 'Error')
            return
        }

        // Check permission
        let hasPermission = await SpeechRecognition.hasPermission()

        if (!hasPermission) {
            console.log('SPEECH RECOGNITION DOES NOT HAVE PERMISSION')
            console.log('REQUESTING PERMISSION')
            await SpeechRecognition.requestPermission()
        }

        // Check if user provided permission
        hasPermission = await SpeechRecognition.hasPermission()
        if (!hasPermission) {
            this.showAlert('La aplicación no tiene permisos para realizar la acción', 'Error')
            return
        }

        // this.setState({ descriptionRecognitionActive: true })

        // Configure options
        const options = {
            language: 'es-MX',
            matches: 50000
        }

        // Start recognition process
        SpeechRecognition.startListening(options)
            .subscribe(
                (matches) => {
                    console.log(matches)
                    this.setState({ comments: this.state.comments + ' ' + matches[0] })
                },
                (err) => {
                    console.log(err)
                    this.showAlert(err, 'Error')
                    // this.setState({ descriptionRecognitionActive: false })
                }
            )
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
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonTextarea
                                        placeholder="Ingresa un comentario adicional..."
                                        onIonChange={this.handleCommentChange}
                                        value={this.state.comments}
                                        rows="15"
                                    >
                                    </IonTextarea>
                                    <div style={{ float: 'right' }}>
                                        <IonButton onClick={this.handleCommentsSpeech}><IonIcon icon={micCircleOutline} /></IonButton>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
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
