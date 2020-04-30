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
    searchOutline, cubeOutline, locationOutline
} from 'ionicons/icons'

// Api
import { getLocations, findLocation } from '../utils/api'

// Actions
import { saveLocations } from '../actions/locations'

// Plugins
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class SelectLocationModal extends Component {

    state = {        
        loading: false,
        searchMethod: 'location',
        searchValue: '',
        selectedLocation: ''
    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSelectChange = (e) => {
        this.setState({ searchMethod: e.target.value })
    }

    handleSelectLocationClick = (location) => {
        this.setState({selectedLocation: location})
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
            getLocations({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveLocations(response.payload))
                        this.setState({ loading: false })
                    }
                })
            return
        }

        findLocation({ method: searchMethod, value: searchValue, token: token })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveLocations(response.payload))
                    this.setState({ loading: false })
                }
            })
    }
  

    render() {

        const { loading } = this.state
        const { locations, showSelectLocationModal, handleToggleSelectLocationModal, handleSubmitLocationClick  } = this.props
        return (
            <IonModal isOpen={showSelectLocationModal}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Seleccionar Ubicación</IonTitle>
                        <ion-buttons slot="end">
                            <ion-button onClick={() => handleToggleSelectLocationModal(false)}>Cerrar</ion-button>
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
                                        <IonSelectOption value="location">location</IonSelectOption>
                                        <IonSelectOption value="siteid">siteid</IonSelectOption>
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
                        locations && Object.values(locations).length > 0 && loading == false
                            ?
                            Object.values(locations).map((location, index) => (
                                <IonItem lines="none" style={{ borderBottom: '1px solid #dedede' }} color={location._rowstamp == this.state.selectedLocation._rowstamp && 'primary' }  key={index} button detail onClick={e => { e.preventDefault(); this.handleSelectLocationClick(location) }}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                                <IonIcon style={{paddingTop: '20px'}} className="searchResultIconLocation" style={{color: location._rowstamp == this.state.selectedLocation._rowstamp && 'white'}} icon={locationOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="10">
                                                <IonRow>

                                                    <IonCol size="6">
                                                        <IonLabel className={location._rowstamp == this.state.selectedLocation._rowstamp ? 'dataTitle white' : 'dataTitle'}>Ubicación</IonLabel>
                                                        <IonLabel className="dataField">{location.location}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="6">
                                                        <IonLabel className={location._rowstamp == this.state.selectedLocation._rowstamp ? 'dataTitle white' : 'dataTitle'}>ID</IonLabel>
                                                        <IonLabel className="dataField">{location.siteid}</IonLabel>
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
                    <IonCol><IonButton expand="full" color="light" onClick={() => handleToggleSelectLocationModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => handleSubmitLocationClick(this.state.selectedLocation)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}
function mapStateToProps({ auth, locations }) {
    return {
        token: auth.token,
        locations: locations

    }
}
export default connect(mapStateToProps)(SelectLocationModal)
