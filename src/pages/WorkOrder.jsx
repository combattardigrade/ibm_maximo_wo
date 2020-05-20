import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
    withIonLifeCycle, useIonViewWillEnter,
    IonButtons,
    IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
    IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow,
    IonCol, IonTabs, IonTab, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon,
    IonFab, IonFabButton, IonModal, IonButton, IonBackButton, IonInput, IonSpinner,
    IonCheckbox, IonText, IonAlert
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import {
    addOutline, peopleOutline, hammerOutline, documentTextOutline, cameraOutline,
    documentAttachOutline, chevronBackOutline, searchOutline, refreshOutline
} from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css'
import './Maximo.css'

import Dashboard from './Dashboard'
import WoDetails from './WoDetails'
import WoTasks from './WoTasks'
import WoPlanned from './WoPlanned'
import WoActual from './WoActual'

// Modals
import LaborModal from './LaborModal'
import MaterialModal from './MaterialModal'
import CommentModal from './CommentModal'

// Actions
import { saveCurrentWorkOrder, saveWorkOrderSafety, updateCurrentWOStatus } from '../actions/workOrders'
import { saveMaterialTransaction, saveAttachment } from '../actions/localWorkOrders'

// API
import { getJobPlan, getWorkOrder, getAsset, getWOSafety, sendWODocumentation } from '../utils/api'

// Plugins
import { PhotoViewer } from '@ionic-native/photo-viewer'
import { Plugins } from '@capacitor/core'
const { Camera } = Plugins

class WorkOrder extends Component {

    state = {
        showLaborModal: false,
        showMaterialModal: false,
        showCommentModal: false,
        currentWorkOrder: '',
        jobPlan: '',
        asset: '',
        loading: true,
        safetyDetails: '',
        wonum: '',
        showCompleteWOVerification: false,
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        supervisor: '',
        reportPhotos: [],
        showPhotoPreview: false,
        showAlert: false,
        alertTitle: '',
        alertMsg: ''
    }

    handleToggleLaborModal = (value) => {
        this.setState({ showLaborModal: value })
    }

    handleToggleMaterialModal = (value, wonum) => {
        wonum
            ? this.setState({ showMaterialModal: value, wonum: wonum })
            : this.setState({ showMaterialModal: value, wonum: '' })
    }

    handleToggleCommentModal = (value) => {
        this.setState({ showCommentModal: value })
    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    handleRefreshClick = (e) => {
        e.preventDefault()
        const { wonum } = this.props.match.params
        const { currentWorkOrder, token, dispatch } = this.props


        getWorkOrder({ wonum: wonum, token: token })
            .then((data) => data.json())
            .then((response) => {
                if (response.status == 'OK') {
                    dispatch(saveCurrentWorkOrder(response.payload))
                    // this.setState({ loading: false })
                }
            })

        getWOSafety({ wonum: wonum, token: token })
            .then((data) => data.json())
            .then((response) => {
                if (response.status == 'OK') {
                    dispatch(saveWorkOrderSafety(response.payload))

                }
            })

    }

    ionViewWillEnter() {
        const { wonum } = this.props.match.params
        const { currentWorkOrder, token, dispatch } = this.props

        if (!currentWorkOrder || currentWorkOrder.wonum != wonum) {
            getWorkOrder({ wonum: wonum, token: token })
                .then((data) => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveCurrentWorkOrder(response.payload))
                        // this.setState({ loading: false })
                    }
                })

            getWOSafety({ wonum: wonum, token: token })
                .then((data) => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveWorkOrderSafety(response.payload))

                    }
                })
        }

    }

    handleTakePhotoBtn = async (e) => {
        e.preventDefault()
        console.log('TAKE_PHOTO_BTN')
        const { currentWorkOrder, dispatch } = this.props

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
            dispatch(saveAttachment({ wonum: currentWorkOrder.wonum, data: photoData.base64String }))
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
        const { currentWorkOrder, dispatch } = this.props

        const options = {
            allowEditing: false,
            quality: 30,
            resultType: 'Base64',
            source: 'PHOTOS'
        }

        try {
            const photoData = await Camera.getPhoto(options)
            dispatch(saveAttachment({ wonum: currentWorkOrder.wonum, data: photoData.base64String }))
        }
        catch (err) {
            console.log(err)
            this.showAlert('message' in err ? err.message : 'Ocurrió un erro al intentar añadir la fotografía')
            return
        }
    }

    supervisorChange = (e) => this.setState({ supervisor: e.target.value })

    handleCloseCompleteWoPopup = (e) => {
        this.setState({ showCompleteWOVerification: false })
    }

    handleCompleteWO = (e) => {
        e.preventDefault()
        // show confirmation pop up
        this.setState({ showCompleteWOVerification: true })
        return
    }

    handleSubmitMaterialClick = (material, materialUsed = 0, materialTask = null) => {
        console.log('CREATE_MATERIAL_TX')
        console.log(material)
        const { currentWorkOrder, dispatch } = this.props


        const materialTransaction = {
            wonum: currentWorkOrder.wonum,
            ...material,
            itemqtyused: materialUsed,
            taskid: materialTask !== null ? materialTask : ''
        }

        // Save material tx
        dispatch(saveMaterialTransaction(materialTransaction))
        // Hide material modal
        this.setState({ showMaterialModal: false })
        return
    }

    handleSendWOBtn = (e) => {
        e.preventDefault()
        console.log('SEND_WO_DOCUMENTATION')
        const { checkbox1, checkbox2, checkbox3, checkbox4, supervisor } = this.state
        const { localWorkOrder, currentWorkOrder, token, dispatch } = this.props
        
        if (!checkbox1 || !checkbox2 || !checkbox3) {
            return
        }

        if (checkbox4 && !supervisor) {
            return
        }     

        const params = {
            woHref: currentWorkOrder.href,
            comments: localWorkOrder.comments,
            attachments: localWorkOrder.attachments,
            materialTransactions: localWorkOrder.materialTransactions,
            laborTransactions: localWorkOrder.laborTransactions, 
            token,           
        }

        console.log(params)
        
        sendWODocumentation(params)
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if(res.status === 'OK') {
                    // update local status
                    // dispatch(updateCurrentWOStatus('DOC'))
                    // show toast
                    this.setState({
                        showToast: true, serverMsg: res.message, serverStatus: 'OK'
                    })
                } else {
                    this.setState({ showToast: true, serverMsg: res.message, serverStatus: 'ERROR'})
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({ showToast: true, serverMsg: err.message, serverStatus: 'ERROR' })
            })
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    render() {
        const { currentWorkOrder, safetyDetails, localWorkOrder } = this.props
        const { showLaborModal, showMaterialModal, showCommentModal, loading } = this.state


        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonButtons slot="start" onClick={e => { e.preventDefault(); this.handleBackBtn() }}>
                            <IonIcon style={{ fontSize: '28px' }} icon={chevronBackOutline}></IonIcon>
                        </IonButtons>
                        <IonTitle>Orden de Trabajo {currentWorkOrder.wonum}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={this.handleRefreshClick}><IonIcon icon={refreshOutline}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {
                        currentWorkOrder
                            ?
                            <ion-tabs selectedIndex="1">

                                <div>
                                    <ion-tab tab="tab-details">
                                        <ion-nav><WoDetails currentWorkOrder={currentWorkOrder} safetyDetails={safetyDetails && safetyDetails} handleCompleteWO={this.handleCompleteWO} /></ion-nav>
                                    </ion-tab>

                                    <ion-tab tab="tab-tasks">
                                        <ion-nav><WoTasks currentWorkOrder={currentWorkOrder} /></ion-nav>
                                    </ion-tab>

                                    <ion-tab tab="tab-planned" >
                                        <ion-nav>
                                            <WoPlanned currentWorkOrder={currentWorkOrder}
                                                handleToggleLaborModal={this.handleToggleLaborModal}
                                                handleToggleMaterialModal={this.handleToggleMaterialModal}
                                            />
                                        </ion-nav>
                                    </ion-tab>

                                    <ion-tab tab="tab-actual" >
                                        <ion-nav>
                                            <WoActual
                                                currentWorkOrder={currentWorkOrder}
                                                handleToggleLaborModal={this.handleToggleLaborModal}
                                                handleToggleMaterialModal={this.handleToggleMaterialModal}
                                                localWorkOrder={localWorkOrder}
                                            />
                                        </ion-nav>
                                    </ion-tab>
                                </div>

                                <ion-tab-bar slot="top" style={{ '--background': '#f5f5f5' }}>
                                    <ion-tab-button tab="tab-details">
                                        <ion-icon name="calendar"></ion-icon>
                                        <ion-label>Detalles</ion-label>
                                    </ion-tab-button>

                                    <ion-tab-button tab="tab-tasks">
                                        <ion-icon name="person-circle"></ion-icon>
                                        <ion-label>Tareas</ion-label>
                                    </ion-tab-button>

                                    <ion-tab-button tab="tab-planned">
                                        <ion-icon name="map"></ion-icon>
                                        <ion-label>Planificado</ion-label>
                                    </ion-tab-button>

                                    <ion-tab-button tab="tab-actual">
                                        <ion-icon name="information-circle"></ion-icon>
                                        <ion-label>Actuales</ion-label>
                                    </ion-tab-button>
                                </ion-tab-bar>

                            </ion-tabs>
                            :
                            <div className="spinnerCenter">
                                <IonSpinner name="crescent" style={{ textAlign: 'center' }} />
                            </div>
                    }


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

                            <ion-fab-button color="light" onClick={() => this.handleToggleCommentModal(true)}>
                                <ion-icon icon={documentTextOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-label>Añadir Comentario</ion-label>

                            <ion-fab-button color="light" onClick={() => this.handleToggleMaterialModal(true)}>
                                <ion-icon icon={hammerOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-label>Añadir Materiales</ion-label>

                            <ion-fab-button color="light" onClick={() => this.handleToggleLaborModal(true)}>
                                <ion-icon icon={peopleOutline} ></ion-icon>
                            </ion-fab-button>
                            <ion-label style={{ right: '55px' }}>Añadir Mano de Obra</ion-label>
                        </ion-fab-list>
                    </ion-fab>

                    {/* Modals */}
                    <LaborModal handleToggleLaborModal={this.handleToggleLaborModal} showLaborModal={showLaborModal} />
                    <MaterialModal handleSubmitMaterialClick={this.handleSubmitMaterialClick} handleToggleMaterialModal={this.handleToggleMaterialModal} showMaterialModal={showMaterialModal} wonum={this.state.wonum} />
                    <CommentModal handleToggleCommentModal={this.handleToggleCommentModal} showCommentModal={showCommentModal} />



                </IonContent>
                {
                    this.state.showCompleteWOVerification &&
                    <Fragment>
                        <div onClick={this.handleCloseCompleteWoPopup} className="custom-backdrop"></div>
                        <div className="popup-container">
                            <div className="popup-header">
                                <h2 className="popup-title">Verificación</h2>
                            </div>
                            <div className="popup-body">
                                <IonItem lines="full">
                                    <IonCheckbox color="danger" onClick={() => this.setState({ checkbox1: !this.state.checkbox1 })} checked={this.state.checkbox1} slot="start" color="primary" />
                                    <IonText style={{ textAlign: 'justify', padding: '10px 0px', fontSize: '14px' }}>Área del activo limpia y ordenada. Se realizó inspección visual (de arriba abajo) del área intervenida, se ha eliminado material residual externo al activo (lubricantes, metálicos, plásticos, etc.</IonText>
                                </IonItem>
                                <IonItem lines="full">
                                    <IonCheckbox onClick={() => this.setState({ checkbox2: !this.state.checkbox2 })} checked={this.state.checkbox2} slot="start" color="primary" />
                                    <IonText style={{ textAlign: 'justify', padding: '10px 0px', fontSize: '14px' }}>Las guardas/barreras de seguridad han sido ubicadas en su lugar.</IonText>
                                </IonItem>
                                <IonItem lines="full">
                                    <IonCheckbox onClick={() => this.setState({ checkbox3: !this.state.checkbox3 })} checked={this.state.checkbox3} slot="start" color="primary" />
                                    <IonText style={{ textAlign: 'justify', padding: '10px 0px', fontSize: '14px' }}>Se han removido todas las refacciones, herramientas, materiales externos, paños de limpieza y todo material utilizado.</IonText>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonCheckbox onClick={() => this.setState({ checkbox4: !this.state.checkbox4 })} checked={this.state.checkbox4} slot="start" color="primary" />
                                    <IonText style={{ textAlign: 'justify', padding: '10px 0px', fontSize: '14px' }}>En caso de que se requiriera saneamiento y limpieza el supervisor fue notificado el supervisor de seguridad alimenticia fue notificado.</IonText>
                                </IonItem>
                                {
                                    this.state.checkbox4 &&
                                    <IonItem lines="none" style={{ borderTop: '1px solid #d9d9d9' }}>
                                        <div style={{ padding: '5px 0px', width: '100%' }}>
                                            <IonInput onChange={this.state.supervisorChange} value={this.state.supervisor} type="text" placeholder="Ingresa el supervisor" />
                                        </div>
                                    </IonItem>
                                }


                            </div>
                            <div className="popup-footer">
                                <div>
                                    <IonButton onClick={this.handleCloseCompleteWoPopup} fill="clear">Cancelar</IonButton>
                                    <IonButton onClick={this.handleSendWOBtn} fill="clear">Enviar</IonButton>
                                </div>
                            </div>
                        </div>
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
                    </Fragment>
                }
            </IonPage >

        );
    }
};


function mapStateToProps({ auth, workOrders, localWorkOrders }) {
    return {
        token: auth.token,
        workOrders: workOrders.workOrders,
        currentWorkOrder: workOrders.currentWorkOrder,
        safetyDetails: workOrders.workOrderSafety,
        localWorkOrder: 'currentWorkOrder' in workOrders && localWorkOrders[workOrders.currentWorkOrder.wonum]
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(WorkOrder))