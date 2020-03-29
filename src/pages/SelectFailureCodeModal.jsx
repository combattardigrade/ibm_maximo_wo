import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea,
    IonSpinner,
} from '@ionic/react';
import {
    searchOutline, cubeOutline, locationOutline, informationCircleOutline
} from 'ionicons/icons'

// API
import { getFailureCodes, findFailureCode } from '../utils/api'

// Actions
import { saveFailureCodes } from '../actions/failureCodes'

// Plugins
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class SelectFailureCodeModal extends Component {

    state = {
        loading: true,
        searchMethod: 'failurecode',
        searchValue: '',
        selectedFailureCode: ''
    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSelectChange = (e) => {
        this.setState({ searchMethod: e.target.value })
    }

    handleSelectFailureCodeClick = (failureCode) => {
        this.setState({ selectedFailureCode: failureCode })
    }

    showAlert(message) {
        Modals.alert({
            title: 'Error',
            message,
        })
    }

    handleSearchClick = (e) => {
        e.preventDefault()
        const { searchMethod, searchValue } = this.state
        const { token, dispatch } = this.props
        this.setState({ loading: true })

        if (!searchValue || !searchMethod) {
            getFailureCodes({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveFailureCodes(response.payload))
                        this.setState({ loading: false })
                    }
                })
            return
        }

        findFailureCode({ searchParam: searchMethod, searchValue: searchValue, token: token })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveFailureCodes(response.payload))
                    this.setState({ loading: false })
                }
            })
    }

    componentDidMount = () => {
        const { token, dispatch } = this.props
        this.setState({ loading: true })        
        getFailureCodes({ token: token })
            .then(data => data.json())
            .then((response) => {
                if (response.status == 'OK') {
                    dispatch(saveFailureCodes(response.payload))
                    this.setState({ loading: false })
                }
            })        
    }


    render() {

        const { loading } = this.state
        const { failureCodes, showSelectFailureCodeModal, handleToggleSelectFailureCodeModal, handleSubmitFailureCodeClick } = this.props
        
        return (
            <IonModal isOpen={showSelectFailureCodeModal}>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle>Seleccionar Código de Falla</IonTitle>
                        <ion-buttons slot="end">
                            <ion-button onClick={() => handleToggleSelectFailureCodeModal(false)}>Cerrar</ion-button>
                        </ion-buttons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    <IonItem>
                        <IonGrid style={{ borderBottom: '1px solid #dedede' }}>
                            <IonRow >
                                <IonCol size="4" style={{ paddingTop: '15px', fontWeight: 'bold' }}><IonLabel >Buscar por:</IonLabel></IonCol>
                                <IonCol size="8">
                                    <IonSelect onIonChange={this.handleSelectChange} style={{ maxWidth: '100% !important', width: '100% !important' }} interface="popover" value={this.state.searchMethod} placeholder="Selecciona método">
                                        <IonSelectOption value="failurecode">Código</IonSelectOption>
                                        <IonSelectOption value="description">Descripción</IonSelectOption>
                                    </IonSelect>
                                </IonCol>
                            </IonRow>
                            <IonRow >
                                <IonCol>
                                    <IonInput onIonChange={this.handleInputChange} value={this.state.searchValue} placeholder="Búsqueda de activo"></IonInput>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={this.handleSearchClick} expand="block">Buscar</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    {
                        failureCodes && Object.values(failureCodes).length > 0 && loading == false
                            ?
                            Object.values(failureCodes).map((failureCode, index) => (
                                <IonItem style={{ borderBottom: '1px solid #dedede' }} color={failureCode._rowstamp == this.state.selectedFailureCode._rowstamp && 'primary'} key={index} button detail onClick={e => { e.preventDefault(); this.handleSelectFailureCodeClick(failureCode) }}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                                <IonIcon style={{ paddingTop: '20px' }} className="searchResultIconLocation" style={{ color: failureCode._rowstamp == this.state.selectedFailureCode._rowstamp && 'white' }} icon={informationCircleOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="10">
                                                <IonRow>

                                                    <IonCol>
                                                        <IonLabel className="dataTitle">Descripción</IonLabel>
                                                        <IonLabel className="dataField">{failureCode.description}</IonLabel>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel className="dataTitle">Código</IonLabel>
                                                        <IonLabel className="dataField">{failureCode.failureCode}</IonLabel>
                                                    </IonCol>
                                                </IonRow>

                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            ))
                            :
                            <div className="spinnerCenter">
                                {
                                    loading ? <IonSpinner name="crescent" style={{ textAlign: 'center' }} /> : <IonLabel>No se encontraron resultados</IonLabel>
                                }
                            </div>
                    }


                </IonContent>
                <IonRow>
                    <IonCol><IonButton expand="full" color="light" onClick={() => handleToggleSelectFailureCodeModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => handleSubmitFailureCodeClick(this.state.selectedFailureCode)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}
function mapStateToProps({ auth, failureCodes }) {
    return {
        token: auth.token,
        failureCodes: failureCodes

    }
}
export default connect(mapStateToProps)(SelectFailureCodeModal)
