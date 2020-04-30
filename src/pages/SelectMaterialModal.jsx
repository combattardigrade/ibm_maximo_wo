import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea,
    IonSpinner, IonAlert, withIonLifeCycle
} from '@ionic/react';
import {
    searchOutline, cubeOutline, locationOutline, informationCircleOutline, layersOutline
} from 'ionicons/icons'

// API
import { findMaterial } from '../utils/api'

// Actions
import { saveMaterials } from '../actions/materials'

// Plugins
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class SelectMaterialModal extends Component {

    state = {
        loading: true,
        searchMethod: 'itemnum',
        searchValue: '',
        selectedMaterial: ''
    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSelectChange = (e) => {
        this.setState({ searchMethod: e.target.value })
    }

    handleSelectMaterialClick = (material) => {
        this.setState({ selectedMaterial: material })
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
        const { token, dispatch, selectedLocation } = this.props
        this.setState({ loading: true })

        if (!searchValue || !searchMethod) {
            findMaterial({ method: 'location', value: selectedLocation, token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveMaterials(response.payload))
                        this.setState({ loading: false })
                    }
                })
            return
        }

        findMaterial({ method: searchMethod, value: searchValue, token: token })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveMaterials(response.payload))
                    this.setState({ loading: false })
                }
            })
    }

    componentDidMount = () => {        
        const { token, dispatch, selectedLocation } = this.props
        this.setState({ loading: true })
        findMaterial({ method: 'location', value: selectedLocation, token: token })
            .then(data => data.json())
            .then((response) => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveMaterials(response.payload))
                    this.setState({ loading: false })
                }
            })
    }


    render() {

        const { loading } = this.state
        const { materials, showSelectMaterialModal, handleToggleSelectMaterialModal, handleSubmitMaterialClick } = this.props

        return (
            <IonModal isOpen={showSelectMaterialModal}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Seleccionar Material</IonTitle>
                        <ion-buttons slot="end">
                            <ion-button onClick={() => handleToggleSelectMaterialModal(false)}>Cerrar</ion-button>
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
                                        <IonSelectOption value="itemnum">Código</IonSelectOption>
                                        <IonSelectOption value="description">Descripción</IonSelectOption>
                                    </IonSelect>
                                </IonCol>
                            </IonRow>
                            <IonRow >
                                <IonCol>
                                    <IonInput onIonChange={this.handleInputChange} value={this.state.searchValue} placeholder="Búsqueda de Material"></IonInput>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={this.handleSearchClick} expand="block">Buscar</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    {
                        materials && Object.values(materials).length > 0 && loading == false
                            ?
                            Object.values(materials).map((material, index) => {
                                console.log(material)
                                return (
                                    <IonItem lines="none" style={{ borderBottom: '1px solid #dedede' }} color={material._rowstamp == this.state.selectedMaterial._rowstamp && 'primary'} key={index} button detail onClick={e => { e.preventDefault(); this.handleSelectMaterialClick(material) }}>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="2" style={{ textAlign: 'center' }}>
                                                    <IonIcon style={{ paddingTop: '20px' }} className="searchResultIconLocation" style={{ color: material._rowstamp == this.state.selectedMaterial._rowstamp && 'white' }} icon={layersOutline}></IonIcon>
                                                </IonCol>
                                                <IonCol size="10">
                                                    <IonRow>

                                                        <IonCol size="6">
                                                            <IonLabel className={ material._rowstamp == this.state.selectedMaterial._rowstamp ? 'dataTittle white' : 'dataTitle'}>Descripción</IonLabel>
                                                            <IonLabel className="dataField">{material.description.substring(0,30)}</IonLabel>
                                                        </IonCol>
                                                        <IonCol size="6">
                                                            <IonLabel className={ material._rowstamp == this.state.selectedMaterial._rowstamp ? 'dataTittle white' : 'dataTitle'}>Código</IonLabel>
                                                            <IonLabel className="dataField">{material.itemnum}</IonLabel>
                                                        </IonCol>
                                                    </IonRow>

                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonItem>
                                )
                            })
                            :
                            <div className="spinnerCenter">
                                {
                                    loading ? <IonSpinner name="crescent" style={{ textAlign: 'center' }} /> : <IonLabel>No se encontraron resultados</IonLabel>
                                }
                            </div>
                    }


                </IonContent>
                <IonRow>
                    <IonCol><IonButton expand="full" color="light" onClick={() => handleToggleSelectMaterialModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => handleSubmitMaterialClick(this.state.selectedMaterial)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}
function mapStateToProps({ auth, materials }) {
    return {
        token: auth.token,
        materials: materials

    }
}
export default connect(mapStateToProps)(withIonLifeCycle(SelectMaterialModal))
