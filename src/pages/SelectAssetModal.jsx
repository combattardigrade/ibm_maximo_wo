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
    searchOutline, cubeOutline
} from 'ionicons/icons'

// Api
import { getAssets, findAsset, getAssetSafety } from '../utils/api'

// Actions
import { saveAssets } from '../actions/assets'

// Plugins
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class SelectAssetModal extends Component {

    state = {
        assets: '',
        loading: false,
        searchMethod: 'assetnum',
        searchValue: '',
        selectedAsset: ''

    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSelectChange = (e) => {
        this.setState({ searchMethod: e.target.value })
    }

    handleSelectAssetClick = (asset) => {
        this.setState({selectedAsset: asset})
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
            getAssets({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveAssets(response.payload))
                        this.setState({ loading: false })
                    }
                })
            return
        }

        findAsset({ method: searchMethod, value: searchValue, token: token })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveAssets(response.payload))
                    this.setState({ loading: false })
                }
            })
    }
  

    render() {

        const { loading } = this.state
        const { assets, showSelectAssetModal, handleToggleSelectAssetModal, handleSubmitAssetClick  } = this.props
        return (
            <IonModal isOpen={showSelectAssetModal}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Seleccionar Activo</IonTitle>
                        <ion-buttons slot="end">
                            <ion-button onClick={() => handleToggleSelectAssetModal(false)}>Cerrar</ion-button>
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
                                        <IonSelectOption value="assetnum">assetnum</IonSelectOption>
                                        <IonSelectOption value="location">ubicación</IonSelectOption>
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
                        assets && assets.length > 0 && loading == false
                            ?
                            assets.map((asset) => (
                                <IonItem lines="none" style={{ borderBottom: '1px solid #dedede' }} color={asset._rowstamp == this.state.selectedAsset._rowstamp && 'primary' }  key={asset._rowstamp} button detail onClick={e => { e.preventDefault(); this.handleSelectAssetClick(asset) }}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                                <IonIcon className="searchResultIcon" style={{color: asset._rowstamp == this.state.selectedAsset._rowstamp && 'white'}} icon={cubeOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="10">
                                                <IonRow>

                                                    <IonCol size="6">
                                                        <IonLabel className={asset._rowstamp == this.state.selectedAsset._rowstamp ? 'dataTitle white' : 'dataTitle'}>Activo</IonLabel>
                                                        <IonLabel className="dataField">{asset.description.substr(0,15)}...</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="6">
                                                        <IonLabel className={asset._rowstamp == this.state.selectedAsset._rowstamp ? 'dataTitle white' : 'dataTitle'}>Código</IonLabel>
                                                        <IonLabel className="dataField">{asset.assetnum}</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                                <IonRow>
                                                    <IonCol size="6">
                                                        <IonLabel className={asset._rowstamp == this.state.selectedAsset._rowstamp ? 'dataTitle white' : 'dataTitle'}>Ubicación</IonLabel>
                                                        <IonLabel className="dataField">{asset.location.substr(0,15)}...</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="6">
                                                        <IonLabel className={asset._rowstamp == this.state.selectedAsset._rowstamp ? 'dataTitle white' : 'dataTitle'}>Planta:</IonLabel>
                                                        <IonLabel className="dataField">{asset.siteid}</IonLabel>
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
                    <IonCol><IonButton expand="full" color="light" onClick={() => handleToggleSelectAssetModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => handleSubmitAssetClick(this.state.selectedAsset)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}
function mapStateToProps({ auth, assets }) {
    return {
        token: auth.token,
        assets: assets.assets

    }
}
export default connect(mapStateToProps)(SelectAssetModal)
