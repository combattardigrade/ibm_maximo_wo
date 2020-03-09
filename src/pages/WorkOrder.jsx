import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    withIonLifeCycle, useIonViewWillEnter,
    IonButtons,
    IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
    IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow,
    IonCol, IonTabs, IonTab, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon,
    IonFab, IonFabButton, IonModal, IonButton, IonBackButton, IonInput, IonSpinner
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import {
    addOutline, peopleOutline, hammerOutline, documentTextOutline, cameraOutline,
    documentAttachOutline, chevronBackOutline, searchOutline
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

import { saveCurrentWorkOrder, saveWorkOrderSafety } from '../actions/workOrders'
import { getJobPlan, getWorkOrder, getAsset, getWOSafety } from '../utils/api'

class WorkOrder extends Component {

    state = {
        showLaborModal: false,
        showMaterialModal: false,
        showCommentModal: false,
        currentWorkOrder: '',
        jobPlan: '',
        asset: '',
        loading: true,
        safetyDetails: ''
    }

    handleToggleLaborModal = (value) => {
        this.setState({ showLaborModal: value })
    }

    handleToggleMaterialModal = (value) => {
        this.setState({ showMaterialModal: value })
    }

    handleToggleCommentModal = (value) => {
        this.setState({ showCommentModal: value })
    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    ionViewWillEnter() {
        const { wonum } = this.props.match.params
        const { currentWorkOrder, token, dispatch } = this.props

        if (!currentWorkOrder || currentWorkOrder.wonum != wonum ) {
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

    render() {
        const { currentWorkOrder, safetyDetails } = this.props
        const { showLaborModal, showMaterialModal, showCommentModal, loading } = this.state


        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start" onClick={e => { e.preventDefault(); this.handleBackBtn() }}>
                            <IonIcon style={{ fontSize: '28px' }} icon={chevronBackOutline}></IonIcon>
                        </IonButtons>
                        <IonTitle>Detalles de Orden de Trabajo</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {
                        currentWorkOrder
                            ?
                            <ion-tabs selectedIndex="1">

                                <div>
                                    <ion-tab tab="tab-details">
                                        <ion-nav><WoDetails currentWorkOrder={currentWorkOrder} safetyDetails={safetyDetails && safetyDetails} /></ion-nav>
                                    </ion-tab>

                                    <ion-tab tab="tab-tasks">
                                        <ion-nav><WoTasks currentWorkOrder={currentWorkOrder} /></ion-nav>
                                    </ion-tab>

                                    <ion-tab tab="tab-planned" >
                                        <ion-nav><WoPlanned currentWorkOrder={currentWorkOrder} /></ion-nav>
                                    </ion-tab>

                                    <ion-tab tab="tab-actual" >
                                        <ion-nav><WoActual currentWorkOrder={currentWorkOrder} /></ion-nav>
                                    </ion-tab>
                                </div>

                                <ion-tab-bar slot="top">
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
                            <ion-fab-button color="light" onClick={() => this.handleToggleCommentModal(true)}>
                                <ion-icon icon={documentTextOutline}></ion-icon>
                            </ion-fab-button>
                            <ion-fab-button color="light" onClick={() => this.handleToggleMaterialModal(true)}>
                                <ion-icon icon={hammerOutline}></ion-icon>
                            </ion-fab-button>

                            <ion-fab-button color="light" onClick={() => this.handleToggleLaborModal(true)}>
                                <ion-icon icon={peopleOutline} ></ion-icon>
                            </ion-fab-button>
                        </ion-fab-list>
                    </ion-fab>

                    {/* Modals */}
                    <LaborModal handleToggleLaborModal={this.handleToggleLaborModal} showLaborModal={showLaborModal} />
                    <MaterialModal handleToggleMaterialModal={this.handleToggleMaterialModal} showMaterialModal={showMaterialModal} />
                    <CommentModal handleToggleCommentModal={this.handleToggleCommentModal} showCommentModal={showCommentModal} />


                </IonContent>
            </IonPage >

        );
    }
};


function mapStateToProps({ auth, workOrders }) {
    return {
        token: auth.token,
        workOrders: workOrders.workOrders,
        currentWorkOrder: workOrders.currentWorkOrder,
        safetyDetails: workOrders.workOrderSafety
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(WorkOrder))