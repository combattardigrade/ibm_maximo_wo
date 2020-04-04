import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon, IonSelect, IonSelectOption,
    IonModal, IonButton, IonInput, IonSpinner, IonDatetime
} from '@ionic/react';
import {
    searchOutline
} from 'ionicons/icons'

import { saveLaborTransaction } from '../actions/localWorkOrders'

class LaborDetailsModal extends Component {

    state = {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        duration: '0.0',
    }

    handleDatePickerChange = date => this.setState({ date })

    calculateDuration = () => {
        let { startDate, endDate } = this.state
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        const diffTime = Math.abs(endDate - startDate)
        const duration = (diffTime / (1000 * 60 * 60)).toFixed(2)
        this.setState({ duration })
    }

    handleLaborDetailsSubmit = (e) => {
        e.preventDefault()
        const { currentWorkOrder, labor, dispatch } = this.props
        const { duration, startDate, endDate } = this.state
       
        const laborTransaction = {
            wonum: currentWorkOrder.wonum, 
            duration,
            starttime: startDate,
            finishdatetime: endDate,
            ...labor
        }
        
        dispatch(saveLaborTransaction(laborTransaction))
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
                    <IonItem>
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
                    <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleLaborDetailsModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={this.handleLaborDetailsSubmit}>Aceptar</IonButton></IonCol>
                </IonRow>
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