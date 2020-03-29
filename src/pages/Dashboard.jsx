import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonSpinner, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle
} from '@ionic/react';
import {
    refreshOutline, save
} from 'ionicons/icons'
import './Page.css';
import './Maximo.css'
import {
    getWorkOrders, getWhoAmI, getInventory, getAssets,
    getWorkOrder, checkWOHazardVerification,
    sendWOHazardVerification, getLaborCatalog, getLocations,
    getMaterials,   
} from '../utils/api'
// Actions
import { saveWorkOrders, saveCurrentWorkOrder, saveWorkOrderSafety } from '../actions/workOrders'
import { saveUser } from '../actions/user'
import { saveInventory } from '../actions/inventory'
import { saveAssets } from '../actions/assets'
import { saveLaborCatalog } from '../actions/labor'
import { saveLocations } from '../actions/locations'
import { saveMaterials } from '../actions/materials'


import WoCard from '../components/WoCard'
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class Dashboard extends Component {

    state = {
        loading: true,
        showHazardVerification: false,
        wonum: '',


    }

    ionViewWillEnter() {
        const { token, dispatch, workOrders, user, inventory, assets, labor, locations, materials } = this.props

        if (workOrders && user && inventory && assets && labor && locations) {
            this.setState({ loading: false })
            return
        }

        if (!workOrders) {
            getWorkOrders({ token: token })
                .then(data => data.json())
                .then(response => {
                    if (!('status' in response) || response.status == 'ERROR') {
                        console.log(response)
                        this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                        return
                    }
                    dispatch(saveWorkOrders(response.payload))
                    this.setState({ loading: false })
                })
                .catch((err) => {
                    console.log(err)
                    this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                    return
                })
        }


        if (!user) {
            getWhoAmI({ token: token })
                .then(data => data.json())
                .then(response => {
                    if (!('status' in response) || response.status == 'ERROR') {
                        console.log(response)
                        return
                    }
                    dispatch(saveUser(response.payload))
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        if (!inventory) {
            getInventory({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveInventory(response.payload))
                    }
                })
                .catch((err) => console.log(err))
        }

        if (!assets) {
            getAssets({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveAssets(response.payload))
                    }
                })
                .catch((err) => console.log(err))
        }

        if (!labor) {

            getLaborCatalog({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        console.log(response.payload)
                        dispatch(saveLaborCatalog(response.payload))
                    }
                })
                .catch((err) => console.log(err))
        }

        
        if (!locations) {
            getLocations({ token: token })
                .then(data => data.json())
                .then((response) => {
                    console.log(response)
                    if (response.status == 'OK') {
                        console.log(response.payload)
                        dispatch(saveLocations(response.payload))
                    }
                })
        }

        if(!materials) {
            getMaterials({ token })
                .then((data) => data.json())
                .then((response) => {
                    console.log(response)
                    if(response.status == 'OK') {
                        console.log(response.payload)
                        dispatch(saveMaterials(response.payload))
                    }
                })
        }


    }

    handleWorkOrderClick = (wonum) => {

        this.props.history.push('/wo/' + wonum)
        // this.setState({showHazardVerification: true})

    }

    handleHazardVerificationClick = async (data) => {
        const { token } = this.props
        const { wonum } = this.state
        if (data.length != 3) {
            this.setState({ showHazardVerification: false })
            return
        }


        this.props.history.push('/wo/' + wonum)
    }

    handleRefreshClick = async (e) => {
        e.preventDefault()
        const { token, dispatch } = this.props
        this.setState({ loading: true })
        getWorkOrders({ token: token })
            .then(data => data.json())
            .then(response => {
                if (!('status' in response) || response.status == 'ERROR') {
                    console.log(response)
                    this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                    return
                }
                dispatch(saveWorkOrders(response.payload))
                this.setState({ loading: false })
            })
            .catch((err) => {
                console.log(err)
                this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                return
            })
    }

    async showAlert(message) {
        await Modals.alert({
            title: 'Error',
            message,
        })
    }

    render() {
        const { workOrders } = this.props
        const { loading, showHazardVerification } = this.state

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Dashboard</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={this.handleRefreshClick}><IonIcon icon={refreshOutline}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonRefresher slot="fixed" >
                        <IonRefresherContent
                            pullingIcon="arrow-dropdown"
                            pullingText="Pull to refresh"
                            refreshingSpinner="circles"
                            refreshingText="Refreshing...">
                        </IonRefresherContent>
                    </IonRefresher>

                    {
                        workOrders && loading == false ?
                            workOrders.map((wo) => (
                                <WoCard key={wo.wonum} wo={wo} handleWorkOrderClick={this.handleWorkOrderClick} />
                            ))
                            :
                            <div className="spinnerCenter">
                                <IonSpinner name="crescent" style={{ textAlign: 'center' }} />
                            </div>
                    }

                    <IonAlert
                        isOpen={showHazardVerification}
                        header={'Verificación'}
                        inputs={[
                            {
                                name: 'checkbox1',
                                value: 'true',
                                type: 'checkbox',
                                label: 'Tengo permiso de trabajo Aprobado para trabajos riesgosos.',
                                checked: false,
                            },
                            {
                                name: 'checkbox2',
                                value: 'true',
                                type: 'checkbox',
                                label: 'Cuento con el equipo y protección necesaria.',
                                checked: false,
                            },
                            {
                                name: 'checkbox3',
                                value: 'true',
                                type: 'checkbox',
                                label: 'Realicé LoTo antes de intervenir equipo.',
                                checked: false,
                            }
                        ]}
                        buttons={[
                            {
                                text: 'Cancelar',
                                role: 'cancel',
                                handler: () => {
                                    this.setState({ showHazardVerification: false })
                                }
                            },
                            {
                                text: 'Enviar',

                                handler: (data) => {
                                    this.handleHazardVerificationClick(data)
                                }
                            }
                        ]}
                    />



                </IonContent>
            </IonPage>
        );
    }
};


function mapStateToProps({ auth, workOrders, user, inventory, assets, labor, comments, locations, materials }) {
    return {
        token: auth.token,
        workOrders: workOrders && workOrders.workOrders,
        user,
        inventory,
        assets,
        labor,
        comments,
        locations,
        materials,
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Dashboard))