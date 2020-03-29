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
    searchOutline, cubeOutline, locationOutline, informationCircleOutline
} from 'ionicons/icons'

// API
import { findInventoryItem } from '../utils/api'

// Actions
import { saveInventory } from '../actions/inventory'

// Plugins
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class SelectInventoryModal extends Component {

    state = {
        loading: true,
        searchMethod: 'failurecode',
        searchValue: '',
        selectedItem: ''
    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSelectChange = (e) => {
        this.setState({ searchMethod: e.target.value })
    }

    handleSelectItemClick = (item) => {
        this.setState({ selectedItem: item })
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
            findInventoryItem({ method: 'location', value: selectedLocation, token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveInventory(response.payload))
                        this.setState({ loading: false })
                    }
                })
            return
        }

        findInventoryItem({ searchParam: searchMethod, searchValue: searchValue, token: token })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveInventory(response.payload))
                    this.setState({ loading: false })
                }
            })
    }

    componentDidMount = () => {
        console.log('test')
        const { token, dispatch, selectedLocation } = this.props
        this.setState({ loading: true })        
        findInventoryItem({ method: 'location', value: selectedLocation, token: token })
            .then(data => data.json())
            .then((response) => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveInventory(response.payload))
                    this.setState({ loading: false })
                }
            })        
    }


    render() {

        const { loading } = this.state
        const { inventory, showSelectInventoryModal, handleToggleSelectInventoryModal, handleSubmitInventoryClick } = this.props
        
        return (
            <IonModal isOpen={showSelectInventoryModal}>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonTitle>Seleccionar Material</IonTitle>
                        <ion-buttons slot="end">
                            <ion-button onClick={() => handleToggleSelectInventoryModal(false)}>Cerrar</ion-button>
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
                                    <IonInput onIonChange={this.handleInputChange} value={this.state.searchValue} placeholder="Búsqueda de Material"></IonInput>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={this.handleSearchClick} expand="block">Buscar</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    {
                        inventory && inventory.length > 0 && loading == false
                            ?
                            inventory.map((item, index) => (
                                <IonItem style={{ borderBottom: '1px solid #dedede' }} color={item._rowstamp == this.state.selectedItem._rowstamp && 'primary'} key={index} button detail onClick={e => { e.preventDefault(); this.handleSelectItemClick(item) }}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                                <IonIcon style={{ paddingTop: '20px' }} className="searchResultIconLocation" style={{ color: item._rowstamp == this.state.selectedItem._rowstamp && 'white' }} icon={informationCircleOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="10">
                                                <IonRow>

                                                    <IonCol>
                                                        <IonLabel className="dataTitle">Descripción</IonLabel>
                                                        <IonLabel className="dataField">{item.itemDetails.description}</IonLabel>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel className="dataTitle">Código</IonLabel>
                                                        <IonLabel className="dataField">{item.itemnum}</IonLabel>
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
                    <IonCol><IonButton expand="full" color="light" onClick={() => handleToggleSelectInventoryModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => handleSubmitInventoryClick(this.state.selectedItem)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}
function mapStateToProps({ auth, inventory }) {
    return {
        token: auth.token,
        inventory: inventory.inventory

    }
}
export default connect(mapStateToProps)(withIonLifeCycle(SelectInventoryModal))
