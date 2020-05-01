import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonButtons, IonButton, IonContent, IonHeader, IonSelect, IonSelectOption,
    IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent,
    IonGrid, IonRow, IonCol, IonNote, IonIcon, IonTextarea, IonInput, IonItemDivider,
    IonToast
} from '@ionic/react';
import {
    addOutline, peopleOutline, hammerOutline, documentTextOutline, cameraOutline,
    documentAttachOutline, chevronBackOutline, searchOutline, addCircle, swapHorizontalOutline
} from 'ionicons/icons'

import './Page.css';
import './Maximo.css'

// Modals
import SelectAssetModal from './SelectAssetModal'
import SelectLocationModal from './SelectLocationModal'
import SelectFailureCodeModal from './SelectFailureCodeModal'
import MaterialModal from './MaterialModal'

// Components
import TimeField from 'react-simple-timefield'
import Loading from '../components/Loading'

// API
import { createReportOfScheduledWork } from '../utils/api'

class ScheduledWork extends Component {

    state = {
        showSelectAssetModal: false,
        showSelectLocationModal: false,
        selectedAsset: '',
        selectedLocation: '',
        workType: '',
        priority: 1,
        description: '',
        comments: '',
        serverMsg: '',
        serverStatus: '',
        showToast: false,
        loading: false
    }

    // SelecteAssetModal => 
    handleSubmitAssetClick = (asset) => {
        console.log(asset)
        this.setState({ showSelectAssetModal: false, selectedAsset: asset, selectedLocation: { siteid: asset.siteid, location: asset.location } })
    }

    handleSubmitLocationClick = (location) => {
        console.log(location)
        this.setState({ showSelectLocationModal: false, selectedLocation: location })
    }

    // Toggle Modals
    handleToggleSelectAssetModal = (value) => {
        console.log('SHOW_SELECT_ASSET_MODAL')
        this.setState({ showSelectAssetModal: value })
    }

    // Toggle Select Location Modal
    handleToggleSelectLocationModal = (value) => {
        console.log('SHOW_SELECT_LOCATION_MODAL')
        this.setState({ showSelectLocationModal: value })
    }

    // handle description change
    handleDescriptionChange = (e) => {
        e.preventDefault()
        this.setState({ description: e.target.value })
    }

    // work type select
    handleWorkTypeSelect = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({ workType: e.target.value })
    }

    // priority select
    handlePrioritySelect = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({ priority: e.target.value })
    }

    handleCommentsChange = (e) => {
        e.preventDefault()
        this.setState({ comments: e.target.value })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()

        const { user, token } = this.props
        const {
            description, selectedAsset, selectedLocation,
            workType, priority, comments,
        } = this.state

        if (!description) {
            this.setState({ serverMsg: 'Ingresa la descripción del trabajo realizado', serverStatus: 'ERROR', showToast: true })
            return
        }

        if (!selectedAsset) {
            this.setState({ serverMsg: 'Selecciona un Activo', serverStatus: 'ERROR', showToast: true })
            return
        }

        if (!selectedLocation || selectedLocation.siteid == null || selectedLocation.location == null) {
            this.setState({ serverMsg: 'Selecciona una ubicación', serverStatus: 'ERROR', showToast: true })
            return
        }        

        if (!workType) {
            this.setState({ serverMsg: 'Selecciona el Tipo de Trabajo realizado', serverStatus: 'ERROR', showToast: true })
            return
        }

        if (!priority) {
            this.setState({ serverMsg: 'Selecciona la prioridad del trabajo realizado', serverStatus: 'ERROR', showToast: true })
            return
        }        

        if (!comments) {
            this.setState({ serverMsg: 'Ingresa comentarios adicionales del trabajo realizado', serverStatus: 'ERROR', showToast: true })
            return
        }

        this.setState({ loading: true })

        const params = {
            description,
            assetnum: selectedAsset.assetnum,
            siteid: selectedLocation.siteid,
            location: selectedLocation.location,
            worktype: workType,
            wopriority: priority,            
            description_longdescription: comments,
            supervisor: user.supervisor,
            token,
        }

        createReportOfScheduledWork(params)
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {

                    this.setState({
                        description: '',
                        selectedAsset: '',
                        selectedLocation: '',                        
                        workType: '',
                        priority: '',                        
                        comments: '',
                        serverMsg: res.message,
                        serverStatus: 'OK',
                        showToast: true,
                        loading: false
                    })
                } else {
                    this.setState({
                        serverMsg: res.message,
                        serverStatus: 'ERROR',
                        showToast: true,
                        loading: false
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({ serverMsg: 'Ocurrió un error al intentar realizar la acción', serverStatus: 'ERROR', showToast: true, loading: false })
            })
    }

    // Back Btn
    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {

        const {
            showSelectAssetModal, showSelectLocationModal, selectedAsset, selectedLocation,
            workType, priority, loading
        } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start" onClick={e => { e.preventDefault(); this.handleBackBtn() }}>
                            <IonIcon style={{ fontSize: '28px' }} icon={chevronBackOutline}></IonIcon>
                        </IonButtons>
                        <IonTitle style={{ fontSize: '18px' }}>Reporte de Trabajo a Programar</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol><IonLabel className="dataTitle">Indicar Trabajo a Programar</IonLabel></IonCol>
                            </IonRow>
                            <IonRow>
                                <IonTextarea
                                    placeholder="Ingresa la descripción del trabajo a programar..."
                                    maxlength="50000"
                                    className="dataField"
                                    rows="3"
                                    onIonChange={this.handleDescriptionChange}
                                    value={this.state.description}
                                >

                                </IonTextarea>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                {
                                    selectedAsset
                                        ?
                                        <Fragment>
                                            <IonCol size="10">
                                                <IonLabel className="dataTitle">Activo</IonLabel>
                                                <IonLabel className="dataField">{selectedAsset.assetnum} - {selectedAsset.description}</IonLabel>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton onClick={() => this.handleToggleSelectAssetModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={swapHorizontalOutline}></IonIcon></IonButton>
                                            </IonCol>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <IonCol size="10">
                                                <IonLabel className="dataTitle">Activo</IonLabel>
                                                <IonLabel className="dataField">No hay ningún activo seleccionado</IonLabel>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton onClick={() => this.handleToggleSelectAssetModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={addCircle}></IonIcon></IonButton>
                                            </IonCol>
                                        </Fragment>
                                }

                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                {
                                    selectedLocation
                                        ?
                                        <Fragment>
                                            <IonCol size="10">
                                                <IonLabel className="dataTitle">Ubicación</IonLabel>
                                                <IonLabel className="dataField">{selectedLocation.siteid} - {selectedLocation.location} </IonLabel>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton onClick={() => this.handleToggleSelectLocationModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={swapHorizontalOutline}></IonIcon></IonButton>
                                            </IonCol>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <IonCol size="10">
                                                <IonLabel className="dataTitle">Ubicación</IonLabel>
                                                <IonLabel className="dataField">No hay ningúna ubicación seleccionado</IonLabel>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton onClick={() => this.handleToggleSelectLocationModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={addCircle}></IonIcon></IonButton>
                                            </IonCol>
                                        </Fragment>
                                }
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow >
                                <IonCol size="12" >
                                    <IonLabel className="dataTitle">Tipo de Trabajo</IonLabel>
                                    <IonSelect onIonChange={this.handleWorkTypeSelect} value={this.state.workType} className="dataField" style={{ paddingLeft: '0px' }} placeholder="Seleccionar Tipo" okText="OK" cancelText="Cerrar">
                                        <IonSelectOption value="EM">EM</IonSelectOption>
                                        <IonSelectOption value="CM">CM</IonSelectOption>
                                        <IonSelectOption value="INPS">INPS</IonSelectOption>
                                        <IonSelectOption value="LUB">LUB</IonSelectOption>
                                        <IonSelectOption value="TRN">TRN</IonSelectOption>
                                        <IonSelectOption value="HSE">HSE</IonSelectOption>
                                        <IonSelectOption value="PROJ">PROJ</IonSelectOption>
                                    </IonSelect>
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow >
                                <IonCol size="12" >
                                    <IonLabel className="dataTitle">Priodidad</IonLabel>
                                    <IonSelect onIonChange={this.handlePrioritySelect} value={this.state.workType == 'EM' ? '1' : this.state.priority} className="dataField" style={{ paddingLeft: '0px' }} placeholder="Seleccionar Tipo" okText="OK" cancelText="Cerrar">
                                        <IonSelectOption value="1">1</IonSelectOption>
                                        <IonSelectOption value="2">2</IonSelectOption>
                                        <IonSelectOption value="3">3</IonSelectOption>
                                        <IonSelectOption value="4">4</IonSelectOption>
                                    </IonSelect>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow >
                                <IonCol size="12" >
                                    <IonLabel className="dataTitle">Comentarios Adicionales</IonLabel>
                                    <IonTextarea
                                        placeholder="Ingresa comentarios adicionales..."
                                        maxlength="50000"
                                        className="dataField"
                                        rows="3"
                                        onIonChange={this.handleCommentsChange}
                                        value={this.state.comments}
                                    >
                                    </IonTextarea>
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
                        <IonGrid>
                            <Fragment>
                                <IonCol size="10">
                                    <IonLabel className="dataTitle">Archivos Adjuntos</IonLabel>
                                    <IonLabel className="dataField">No hay archivos adjuntos</IonLabel>
                                </IonCol>
                            </Fragment>
                        </IonGrid>
                    </IonItem>

                    <IonGrid style={{ marginTop: '10px', marginBottom: '80px' }}>
                        <IonRow>
                            <IonCol><IonButton expand="full" color="light" onClick={() => this.handleBackBtn()}>Cancelar</IonButton></IonCol>
                            <IonCol><IonButton expand="full" onClick={this.handleSubmitBtn}>Enviar</IonButton></IonCol>
                        </IonRow>
                    </IonGrid>

                    <ion-fab horizontal="end" vertical="bottom" slot="fixed">
                        <ion-fab-button color="primary">
                            <ion-icon style={{ color: 'white' }} icon={addOutline}></ion-icon>
                        </ion-fab-button>
                        <ion-fab-list side="top">
                            <ion-fab-button color="light">
                                <ion-icon icon={documentAttachOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-fab-button color="light">
                                <ion-icon icon={cameraOutline}></ion-icon>
                            </ion-fab-button>
                        </ion-fab-list>
                    </ion-fab>

                    {/* Modals */}
                    <SelectAssetModal
                        handleToggleSelectAssetModal={this.handleToggleSelectAssetModal}
                        showSelectAssetModal={showSelectAssetModal}
                        handleSubmitAssetClick={this.handleSubmitAssetClick}
                    />
                    <SelectLocationModal
                        handleToggleSelectLocationModal={this.handleToggleSelectLocationModal}
                        showSelectLocationModal={showSelectLocationModal}
                        handleSubmitLocationClick={this.handleSubmitLocationClick}
                    />

                    <IonToast
                        isOpen={this.state.showToast}
                        message={this.state.serverMsg}
                        position="bottom"
                        color={this.state.serverStatus === 'OK' ? 'primary' : 'danger'}
                        duration={5000}
                        onDidDismiss={() => this.setState({ showToast: false })}
                    />

                </IonContent>
            </IonPage>
        );
    }
};

function mapStateToProps({ auth, user }) {
    return {
        token: auth && auth.token,
        user,
    }
}

export default connect(mapStateToProps)(ScheduledWork)
