import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel,
    IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonInput, IonButton,
    IonSelect, IonSelectOption, IonSpinner

} from '@ionic/react';
import {
    addOutline, peopleOutline, hammerOutline, documentTextOutline, cameraOutline,
    documentAttachOutline, chevronBackOutline, cubeOutline
} from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import './Maximo.css'
import { Plugins } from '@capacitor/core'
import { getAssets, findAsset, getAssetSafety } from '../utils/api'
import { saveAssets } from '../actions/assets'
import AssetModal from './AssetModal'
const { Modals } = Plugins


class AssetsList extends Component {

    state = {
        assets: '',
        loading: true,
        searchMethod: 'assetnum',
        searchValue: '',
        showAssetModal: false,
        asset: '',
        assetSafety: '',
        modalLoading: false
    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSelectChange = (e) => {
        this.setState({ searchMethod: e.target.value })
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

    showAlert(message) {
        Modals.alert({
            title: 'Error',
            message,
        })
    }

    handleToggleAssetModal = (value) => {
        this.setState({ showAssetModal: value })
    }

    handleAssetClick = (_rowstamp) => {
        const { token, assets, dispatch } = this.props
        this.setState({ showAssetModal: true, modalLoading: true })
        const asset = assets.filter(a => a._rowstamp == _rowstamp)
        this.setState({ asset: asset[0], loading: false })
        getAssetSafety({ assetnum: asset[0].assetnum, token: token })
            .then(data => data.json())
            .then(res => {
                console.log('assetSafety: ' + res.payload)
                this.setState({ assetSafety: res.status == 'OK' && res.payload })
                return false
            })

    }

    componentDidMount() {
        const { token, assets, dispatch } = this.props
        if (!assets) {
            getAssets({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveAssets(response.payload))
                    }
                })
                .catch((err) => console.log(err))
        } else {
            this.setState({ loading: false })
        }
    }

    render() {
        const { loading, showAssetModal } = this.state
        const { assets } = this.props

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start" onClick={e => { e.preventDefault(); this.handleBackBtn() }}>
                            <IonIcon style={{ fontSize: '28px' }} icon={chevronBackOutline}></IonIcon>
                        </IonButtons>
                        <IonTitle>Lista de Activos</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

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

                    {
                        assets.length > 0 && loading == false
                            ?
                            assets.map((asset) => (
                                <IonItem key={asset._rowstamp} button detail onClick={e => { e.preventDefault(); this.handleAssetClick(asset._rowstamp) }}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                                <IonIcon className="searchResultIcon" icon={cubeOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="10">
                                                <IonRow>

                                                    <IonCol>
                                                        <IonLabel className="dataTitle">Activo</IonLabel>
                                                        <IonLabel className="dataField">{asset.description}</IonLabel>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel className="dataTitle">Código</IonLabel>
                                                        <IonLabel className="dataField">{asset.assetnum}</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonLabel className="dataTitle">Ubicación</IonLabel>
                                                        <IonLabel className="dataField">{asset.location}</IonLabel>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel className="dataTitle">Planta:</IonLabel>
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
                    <AssetModal handleToggleAssetModal={this.handleToggleAssetModal} showAssetModal={showAssetModal} asset={this.state.asset} assetSafety={this.state.assetSafety} modalLoading={this.state.modalLoading} />
                </IonContent>
            </IonPage>
        );
    }
};

function mapStateToProps({ auth, assets }) {
    return {
        token: auth.token,
        assets: assets.assets

    }
}

export default connect(mapStateToProps)(AssetsList)
