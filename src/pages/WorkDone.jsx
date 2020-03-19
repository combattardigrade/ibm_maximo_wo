import React, { Component, Fragment } from 'react'
import {
    IonButtons, IonButton, IonContent, IonHeader, IonSelect, IonSelectOption,
    IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent,
    IonGrid, IonRow, IonCol, IonNote, IonIcon, IonTextarea, IonInput, IonItemDivider
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
import TimeField from 'react-simple-timefield';

class WorkDone extends Component {

    state = {
        showMaterialModal: false,
        showSelectAssetModal: false,
        showSelectLocationModal: false,
        showSelectFailureCodeModal: true,
        selectedAsset: '',
        selectedLocation: '',
        selectedFailureCode: '',
        workType: '',
        priority: 1,
        description: '',
        timeWorked: '0:00',
        downtime: '0:00',
        comments: '',
        
    }

    // SelecteAssetModal => 
    handleSubmitAssetClick = (asset) => {
        console.log(asset)
        this.setState({ showSelectAssetModal: false, selectedAsset: asset })
    }

    handleSubmitLocationClick = (location) => {
        console.log(location)
        this.setState({ showSelectLocationModal: false, selectedLocation: location })
    }

    handleSubmitFailureCodeClick = (failureCode) => {
        console.log(failureCode)
        this.setState({ showSelectFailureCodeModal: false, selectedFailureCode: failureCode })
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

    // Toggle Select Failure Code Modal
    handleToggleSelectFailureCodeModal = (value) => {
        console.log('SHOW_SELECT_FAILURECODE_MODAL')        
        this.setState({ showSelectFailureCodeModal: value })     
        
    }

    handleToggleMaterialModal = (value) => {
        console.log('SHOW_MATERIAL_MODAL')
        this.setState({ showMaterialModal: value })
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

    handleTimeWorkedChange = (e, timeWorked) => {
        e.preventDefault()
        this.setState({ timeWorked: timeWorked })
    }

    handleDownTimeChange = (e, downtime) => {
        e.preventDefault()
        this.setState({ downtime: downtime })
    }

    handleCommentsChange = (e) => {
        e.preventDefault()
        this.setState({ comments: e.target.value })
    }

    // Back Btn
    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {
        const { currentWorkOrder, asset } = this.props
        const {
            showSelectAssetModal, showSelectLocationModal, showMaterialModal, showSelectFailureCodeModal,
            selectedAsset, selectedLocation, workType, priority, selectedFailureCode
        } = this.state
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonButtons slot="start" onClick={e => { e.preventDefault(); this.handleBackBtn() }}>
                            <IonIcon style={{ fontSize: '28px' }} icon={chevronBackOutline}></IonIcon>
                        </IonButtons>
                        <IonTitle>Reporte de Trabajo Realizado</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol><IonLabel className="dataTitle">Indicar Trabajo Realizado</IonLabel></IonCol>
                            </IonRow>
                            <IonRow>
                                <IonTextarea
                                    placeholder="Ingresa la descripción del trabajo realizado..."
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

                    <IonItem style={{}}>
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

                    <IonItem style={{}}>
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

                    <IonItem style={{}}>
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
                    <IonItem style={{}}>
                        <IonGrid>
                            <IonRow >
                                <IonCol size="12" >
                                    <IonLabel className="dataTitle">Priodidad</IonLabel>
                                    <IonSelect onIonChange={this.handlePrioritySelect} value={this.state.workType == 'EM' ? '1' : this.state.priority} className="dataField" style={{ paddingLeft: '0px' }} placeholder="Seleccionar Tipo" okText="OK" cancelText="Cerrar">
                                        <IonSelectOption value="1">1</IonSelectOption>
                                        <IonSelectOption value="2">2</IonSelectOption>
                                        <IonSelectOption value="3">3</IonSelectOption>
                                        <IonSelectOption value="4">4</IonSelectOption>
                                        <IonSelectOption value="5">5</IonSelectOption>
                                        <IonSelectOption value="6">6</IonSelectOption>
                                        <IonSelectOption value="7">7</IonSelectOption>
                                        <IonSelectOption value="8">8</IonSelectOption>
                                        <IonSelectOption value="9">9</IonSelectOption>
                                        <IonSelectOption value="10">10</IonSelectOption>
                                    </IonSelect>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>




                    <IonItem style={{}}>
                        <IonGrid>
                            <IonRow >
                                <IonCol size="12" >
                                    <IonLabel className="dataTitle">Horas Trabajadas</IonLabel>
                                    <TimeField style={{ width: '50px', textAlign: 'center' }} value={this.state.timeWorked} onChange={this.handleTimeWorkedChange} />
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem style={{}}>
                        <IonGrid>
                            <IonRow >
                                <IonCol size="12" >
                                    <IonLabel className="dataTitle">Tiempo de Inactividad</IonLabel>
                                    <TimeField style={{ width: '50px', textAlign: 'center', }} value={this.state.downtime} onChange={this.handleDownTimeChange} />
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem style={{}}>
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

                    <IonItem style={{}}>
                        <IonGrid>
                            <IonRow style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                {
                                    selectedFailureCode
                                        ?
                                        <Fragment>
                                            <IonCol size="10">
                                                <IonLabel className="dataTitle">Código de Falla</IonLabel>
                                                <IonLabel className="dataField">{selectedFailureCode.failureCode} - {selectedFailureCode.description}</IonLabel>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton onClick={() => this.handleToggleSelectFailureCodeModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={swapHorizontalOutline}></IonIcon></IonButton>
                                            </IonCol>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <IonCol size="10">
                                                <IonLabel className="dataTitle">Código de Falla</IonLabel>
                                                <IonLabel className="dataField">No hay ningún código seleccionado</IonLabel>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton onClick={() => this.handleToggleSelectFailureCodeModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={addCircle}></IonIcon></IonButton>
                                            </IonCol>
                                        </Fragment>
                                }
                            </IonRow>
                        </IonGrid>
                    </IonItem>



                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol><IonLabel className="dataTitle">Adjuntos</IonLabel></IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <ion-fab horizontal="end" vertical="bottom" slot="fixed">
                        <ion-fab-button color="dark">
                            <ion-icon style={{ color: 'white' }} icon={addOutline}></ion-icon>
                        </ion-fab-button>
                        <ion-fab-list side="top">

                            <ion-fab-button color="light">
                                <ion-icon icon={documentAttachOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-fab-button color="light">
                                <ion-icon icon={cameraOutline}></ion-icon>
                            </ion-fab-button>

                            <ion-fab-button color="light" onClick={() => this.handleToggleMaterialModal(true)}>
                                <ion-icon icon={hammerOutline}></ion-icon>
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
                    <SelectFailureCodeModal
                        handleToggleSelectFailureCodeModal={this.handleToggleSelectFailureCodeModal}
                        showSelectFailureCodeModal={showSelectFailureCodeModal}
                        handleSubmitFailureCodeClick={this.handleSubmitFailureCodeClick}
                    />
                    <MaterialModal handleToggleMaterialModal={this.handleToggleMaterialModal} showMaterialModal={showMaterialModal} />



                </IonContent>
            </IonPage>
        );
    }
};

export default WorkDone;
