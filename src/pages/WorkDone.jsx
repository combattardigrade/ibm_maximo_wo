import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonButtons, IonButton, IonContent, IonHeader, IonSelect, IonSelectOption,
    IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent,
    IonGrid, IonRow, IonCol, IonNote, IonIcon, IonTextarea, IonInput, IonItemDivider,
    IonToast, IonAlert
} from '@ionic/react';
import {
    addOutline, peopleOutline, hammerOutline, documentTextOutline, cameraOutline,
    documentAttachOutline, chevronBackOutline, searchOutline, addCircle, swapHorizontalOutline,
    micCircleOutline, micOffCircleOutline, closeCircle
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
import { createReportOfWorkDone } from '../utils/api'

// Plugins
import { SpeechRecognition } from '@ionic-native/speech-recognition'
import { PhotoViewer } from '@ionic-native/photo-viewer'
import { Plugins } from '@capacitor/core'
const { Camera } = Plugins

class WorkDone extends Component {

    state = {
        showMaterialModal: false,
        showSelectAssetModal: false,
        showSelectLocationModal: false,
        showSelectFailureCodeModal: false,
        selectedAsset: '',
        selectedLocation: '',
        selectedFailureCode: '',
        selectedMaterial: '',
        workType: '',
        priority: 1,
        description: '',
        timeWorked: '0:00',
        downtime: '0:00',
        comments: '',
        serverMsg: '',
        serverStatus: '',
        showToast: false,
        loading: false,
        showAlert: false,
        alertTitle: '',
        alertMsg: '',
        reportPhotos: [],
        showPhotoPreview: false,
        descriptionRecognitionActive: false,
        commentsRecognitionActive: false
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

    handleSubmitFailureCodeClick = (failureCode) => {
        console.log(failureCode)
        this.setState({ showSelectFailureCodeModal: false, selectedFailureCode: failureCode })
    }

    handleSubmitMaterialClick = (material) => {
        console.log(material)
        this.setState({ showMaterialModal: false, selectedMaterial: material })
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

    handleSubmitBtn = (e) => {
        e.preventDefault()

        const { token } = this.props
        const {
            description, selectedAsset, selectedLocation, selectedFailureCode, selectedMaterial,
            workType, priority, timeWorked, downtime, comments, reportPhotos
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

        if (!selectedFailureCode) {
            this.setState({ serverMsg: 'Selecciona el código de la falla', serverStatus: 'ERROR', showToast: true })
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

        if (!timeWorked) {
            this.setState({ serverMsg: 'Ingresa el tiempo trabajado', serverStatus: 'ERROR', showToast: true })
            return
        }

        if (!downtime && workType === 'EM') {
            this.setState({ serverMsg: 'Ingresa el tiempo de inactividad', serverStatus: 'ERROR', showToast: true })
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
            downtime,
            description_longdescription: comments,
            failurecode: selectedFailureCode.failureCode,
            actlabhrs: timeWorked,
            reportPhotos,
            token,
        }

        createReportOfWorkDone(params)
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {

                    this.setState({
                        description: '',
                        selectedAsset: '',
                        selectedLocation: '',
                        selectedFailureCode: '',
                        workType: '',
                        priority: '',
                        timeWorked: '',
                        downtime: '',
                        comments: '',
                        reportPhotos: '',
                        showPhotoPreview: false,
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

    handleTakePhotoBtn = async (e) => {
        e.preventDefault()
        console.log('TAKE_PHOTO_BTN')

        const options = {
            allowEditing: false,
            quality: 30,
            resultType: 'Base64',
            saveGallery: true,
            source: 'CAMERA',
            direction: 'REAR'
        }

        try {
            const photoData = await Camera.getPhoto(options)
            this.setState({ reportPhotos: [...this.state.reportPhotos, photoData.base64String], showPhotoPreview: true })
        }
        catch (err) {
            console.log(err)
            this.showAlert('message' in err ? err.message : 'Ocurrió un error al intentar añadir la fotografía')
            return
        }
    }

    handleGalleryBtn = async (e) => {
        e.preventDefault()
        console.log('GALLERY_BTN')

        const options = {
            allowEditing: false,
            quality: 30,
            resultType: 'Base64',
            source: 'PHOTOS'
        }

        try {
            const photoData = await Camera.getPhoto(options)
            this.setState({ reportPhotos: [...this.state.reportPhotos, photoData.base64String], showPhotoPreview: true })
        }
        catch (err) {
            console.log(err)
            this.showAlert('message' in err ? err.message : 'Ocurrió un erro al intentar añadir la fotografía')
            return
        }
    }

    handleDescriptionSpeech = async (e) => {
        e.preventDefault()
        console.log('DESCRIPTION_SPEECH_RECOGNITION')

        // Check if another speech recognition process is active
        // if (this.state.descriptionRecognitionActive === true || this.state.commentsRecognitionActive === true) {
        //     this.showAlert('Otro proceso de reconocimiento de voz se encuentra activo', 'Error')
        //     return
        // }

        // Check if feature is available
        const available = await SpeechRecognition.isRecognitionAvailable()

        if (!available) {
            this.showAlert('Reconocimiento de voz no disponible en el dispositivo', 'Error')
            return
        }

        // Check permission
        let hasPermission = await SpeechRecognition.hasPermission()

        if (!hasPermission) {
            console.log('SPEECH RECOGNITION DOES NOT HAVE PERMISSION')
            console.log('REQUESTING PERMISSION')
            await SpeechRecognition.requestPermission()
        }

        // Check if user provided permission
        hasPermission = await SpeechRecognition.hasPermission()
        if (!hasPermission) {
            this.showAlert('La aplicación no tiene permisos para realizar la acción', 'Error')
            return
        }

        // this.setState({ descriptionRecognitionActive: true })

        // Configure options
        const options = {
            language: 'es-MX',
            matches: 50000
        }

        // Start recognition process
        SpeechRecognition.startListening(options)
            .subscribe(
                (matches) => {
                    console.log(matches)
                    this.setState({ description: this.state.description + ' ' + matches[0] })
                },
                (err) => {
                    console.log(err)
                    this.showAlert(err, 'Error')
                    // this.setState({ descriptionRecognitionActive: false })
                }
            )
    }

    handleCommentsSpeech = async (e) => {
        e.preventDefault()
        console.log('COMMENTS SPEECH RECOGNITION STARTED')

        // Check if another speech recognition process is active
        // if (this.state.descriptionRecognitionActive === true || this.state.commentsRecognitionActive === true) {
        //     this.showAlert('Otro proceso de reconocimiento de voz se encuentra activo', 'Error')
        //     return
        // }

        // Check if feature is available
        const available = await SpeechRecognition.isRecognitionAvailable()

        if (!available) {
            this.showAlert('Reconocimiento de voz no disponible en el dispositivo', 'Error')
            return
        }

        // Check permission
        let hasPermission = await SpeechRecognition.hasPermission()

        if (!hasPermission) {
            console.log('SPEECH RECOGNITION DOES NOT HAVE PERMISSION')
            console.log('REQUESTING PERMISSION')
            await SpeechRecognition.requestPermission()
        }

        // Check if user provided permission
        hasPermission = await SpeechRecognition.hasPermission()
        if (!hasPermission) {
            this.showAlert('La aplicación no tiene permisos para realizar la acción', 'Error')
            return
        }

        // this.setState({ commentsRecognitionActive: true })

        // Configure options
        const options = {
            language: 'es-MX',
            matches: 50000
        }

        // Start recognition process
        SpeechRecognition.startListening(options)
            .subscribe(
                (matches) => {
                    console.log(matches)
                    this.setState({ comments: this.state.comments + ' ' + matches[0] })
                },
                (err) => {
                    console.log(err)
                    this.showAlert(err, 'Error')
                    // this.setState({ commentsRecognitionActive: false })
                }
            )
    }

    handleStopDescriptionSpeech = async (e) => {
        e.preventDefault()
        console.log('DESCRIPTION SPEECH RECOGNITION STOPPED')
        SpeechRecognition.stopListening()
        // this.setState({ descriptionRecognitionActive: false })
    }

    handleStopCommentsSpeech = async (e) => {
        e.preventDefault()
        console.log('COMMENTS SPEECH RECOGNITION STOPPED')
        SpeechRecognition.stopListening()
        // this.setState({ commentsRecognitionActive: false })
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    handleDeletePhoto = (photoIndex) => {
        const { reportPhotos } = this.state
        this.setState({
            reportPhotos: reportPhotos.filter((p, i) => i != photoIndex)
        })
    }

    // Back Btn
    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {
        const {
            showSelectAssetModal, showSelectLocationModal, showMaterialModal, showSelectFailureCodeModal,
            selectedAsset, selectedLocation, selectedMaterial, workType, priority, selectedFailureCode, loading
        } = this.state

        if (loading) {
            return <Loading />
        }

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
                                <IonCol>
                                    <IonTextarea
                                        placeholder="Ingresa la descripción del trabajo realizado..."
                                        maxlength="95"
                                        className="dataField"
                                        rows="3"
                                        onIonChange={this.handleDescriptionChange}
                                        value={this.state.description}
                                    >
                                    </IonTextarea>
                                    <div style={{ float: 'right' }}>
                                        {
                                            this.state.descriptionRecognitionActive === false
                                                ? <IonButton onClick={this.handleDescriptionSpeech}><IonIcon icon={micCircleOutline} /></IonButton>
                                                : <IonButton onClick={this.handleStopDescriptionSpeech} color="danger"><IonIcon icon={micOffCircleOutline} /></IonButton>
                                        }
                                    </div>
                                </IonCol>
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
                                    <IonLabel className="dataTitle">Horas Trabajadas</IonLabel>
                                    <TimeField style={{ width: '50px', textAlign: 'center' }} value={this.state.timeWorked} onChange={this.handleTimeWorkedChange} />
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    {
                        this.state.workType === 'EM' &&
                        <IonItem lines="full">
                            <IonGrid>
                                <IonRow >
                                    <IonCol size="12" >
                                        <IonLabel className="dataTitle">Tiempo de Inactividad</IonLabel>
                                        <TimeField style={{ width: '50px', textAlign: 'center', }} value={this.state.downtime} onChange={this.handleDownTimeChange} />
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    }


                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow >
                                <IonCol size="12" >
                                    <IonLabel className="dataTitle">Comentarios Adicionales</IonLabel>

                                </IonCol>


                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonTextarea
                                        placeholder="Ingresa comentarios adicionales..."
                                        maxlength="50000"
                                        className="dataField"
                                        rows="3"
                                        onIonChange={this.handleCommentsChange}
                                        value={this.state.comments}
                                    >
                                    </IonTextarea>
                                    <div style={{ float: 'right' }}>
                                        {
                                            this.state.commentsRecognitionActive === false
                                                ? <IonButton onClick={this.handleCommentsSpeech}><IonIcon icon={micCircleOutline} /></IonButton>
                                                : <IonButton onClick={this.handleStopCommentsSpeech} color="danger"><IonIcon icon={micOffCircleOutline} /></IonButton>
                                        }
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
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

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                {
                                    selectedMaterial
                                        ?
                                        <Fragment>
                                            <IonCol size="10">
                                                <IonLabel className="dataTitle">Material</IonLabel>
                                                <IonLabel className="dataField">Itemnum:{selectedMaterial.itemnum} Cantidad:{selectedMaterial.quantity}</IonLabel>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton onClick={() => this.handleToggleMaterialModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={swapHorizontalOutline}></IonIcon></IonButton>
                                            </IonCol>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <IonCol size="10">
                                                <IonLabel className="dataTitle">Material</IonLabel>
                                                <IonLabel className="dataField">No hay ningún código seleccionado</IonLabel>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton onClick={() => this.handleToggleMaterialModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={addCircle}></IonIcon></IonButton>
                                            </IonCol>
                                        </Fragment>

                                }
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonItem lines="full">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="10">
                                    <IonLabel className="dataTitle">Archivos Adjuntos</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                {
                                    this.state.showPhotoPreview && this.state.reportPhotos.length > 0
                                        ?
                                        this.state.reportPhotos.map((photo, i) => (
                                            <IonCol size="3" key={i}>
                                                <IonButton onClick={e => { e.preventDefault(); this.handleDeletePhoto(i) }} color="danger" style={{ position: 'absolute', right: '0' }} fill="clear"><IonIcon icon={closeCircle}></IonIcon></IonButton>
                                                <img onClick={e => { e.preventDefault(); PhotoViewer.show(`data:image/jpeg;base64,${photo}`); }} style={{ height: '100%', width: '100%', marginTop: '10px', borderRadius: '5px' }} src={`data:image/jpeg;base64,${photo}`} />
                                            </IonCol>
                                        ))
                                        :
                                        <IonCol size="10"><IonLabel className="dataField">No hay archivos adjuntos</IonLabel></IonCol>
                                }
                            </IonRow>
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

                            <ion-fab-button color="light" onClick={this.handleGalleryBtn}>
                                <ion-icon icon={documentAttachOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-label>Añadir Documento</ion-label>

                            <ion-fab-button color="light" onClick={this.handleTakePhotoBtn}>
                                <ion-icon icon={cameraOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-label>Añadir Fotografía</ion-label>

                            <ion-fab-button color="light" onClick={() => this.handleToggleMaterialModal(true)}>
                                <ion-icon icon={hammerOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-label>Añadir Materiales</ion-label>

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
                    <MaterialModal
                        handleToggleMaterialModal={this.handleToggleMaterialModal}
                        showMaterialModal={showMaterialModal}
                        handleSubmitMaterialClick={this.handleSubmitMaterialClick}
                    />

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

function mapStateToProps({ auth }) {
    return {
        token: auth && auth.token
    }
}

export default connect(mapStateToProps)(WorkDone)
