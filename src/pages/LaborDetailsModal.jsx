import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon, IonSelect, IonSelectOption,
    IonModal, IonButton, IonInput, IonSpinner, IonDatetime, IonAlert
} from '@ionic/react';
import {
    searchOutline
} from 'ionicons/icons'

import { saveLaborTransaction } from '../actions/localWorkOrders'

import moment from 'moment'

class LaborDetailsModal extends Component {

    state = {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        duration: '0.0',
        showAlert: false,
        alertTitle: '',
        alertMsg: ''
    }

    handleDatePickerChange = date => this.setState({ date })

    calculateDuration = () => {
        let { startDate, endDate } = this.state

        if(!startDate || !endDate) {
            this.setState({ duration: 0.0 })
            return
        }

        // Parse dates
        startDate = moment(startDate)
        endDate = moment(endDate)
        
        // Calculate duration
        const diffTime = endDate.diff(startDate, 'minutes')
        const duration = (parseFloat(diffTime) / 60.0).toFixed(2)
        
        // Check it's a valid duration
        if (duration < 0) {
            this.showAlert('Ingresa una duración válida', 'Error')
            return
        }

        this.setState({ duration })
    }


    handleLaborDetailsSubmit = (e) => {
        e.preventDefault()
        console.log('CREATE_LABOR_TX')
        const { currentWorkOrder, labor, dispatch, handleToggleLaborDetailsModal, handleToggleLaborModal } = this.props
        const { duration, startDate, endDate } = this.state

        if(!labor) {
            this.showAlert('Selecciona una mano de obra válida', 'Error')
            return
        }
        
        if(!duration) {
            this.showAlert('Ingresa una duración válida', 'Error')
            return
        }

        if(!startDate) {
            this.showAlert('Ingresa una fecha de inicio válida', 'Error')
            return
        }

        if(!endDate) {
            this.showAlert('Ingresa una fecha de finalización válida', 'Error')
            return
        }        

        // Allow 0 duration?
        if (parseFloat(duration) < 0 || isNaN(duration)) {
            this.showAlert('Ingresa una duración válida. La duración ingresada es negativa', 'Error')
            return
        }

        const laborTransaction = {
            wonum: currentWorkOrder.wonum,
            duration,
            starttime: startDate,
            finishdatetime: endDate,
            ...labor
        }

        dispatch(saveLaborTransaction(laborTransaction))
        handleToggleLaborModal(false)
        handleToggleLaborDetailsModal(false)

        return
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    render() {

        const { labor } = this.props

        return (
            <IonModal isOpen={this.props.showLaborDetailsModal}>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle>Detalles de la Mano de Obra</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel className="dataTitle">Código</IonLabel>
                                    <IonLabel className="dataField">{labor.laborid}</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel className="dataTitle">Descripción</IonLabel>
                                    <IonLabel className="dataField">{labor ? 'person' in labor ? labor.person[0].displayname : null : null}</IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem >
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel className="dataTitle">Fecha Inicio</IonLabel>
                                    <IonDatetime style={{ paddingLeft: '0px' }} className="dataField" placeholder="Seleccionar fecha" displayFormat="D MMM YYYY H:mm" value={this.state.startDate} onIonChange={e => { this.setState({ startDate: e.detail.value }); this.calculateDuration() }}></IonDatetime>
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem  >
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel className="dataTitle">Fecha Fin</IonLabel>
                                    <IonDatetime style={{ paddingLeft: '0px' }} className="dataField" placeholder="Seleccionar fecha" displayFormat="D MMM YYYY H:mm" value={this.state.endDate} onIonChange={e => { this.setState({ endDate: e.detail.value });; this.calculateDuration() }}></IonDatetime>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel className="dataTitle">Duración del Trabajo</IonLabel>
                                    <IonLabel>{this.state.duration} hrs</IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonContent>
                <IonRow>
                    <IonCol><IonButton expand="full" color="light" onClick={(e) => { e.preventDefault(); this.props.handleToggleLaborDetailsModal(false); }}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={this.handleLaborDetailsSubmit}>Aceptar</IonButton></IonCol>
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

function mapStateToProps({ workOrders }) {
    return {
        currentWorkOrder: workOrders && workOrders.currentWorkOrder


    }
}

export default connect(mapStateToProps)(LaborDetailsModal);