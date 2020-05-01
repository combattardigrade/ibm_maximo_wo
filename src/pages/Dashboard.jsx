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
import { saveLocalWorkOrder } from '../actions/localWorkOrders';

// Components
import WoCard from '../components/WoCard'
import Loading from '../components/Loading'

class Dashboard extends Component {

    state = {
        loading: true,
        showHazardVerification: false,
        currentWonum: '',


    }

    ionViewWillEnter() {
        const { token, dispatch, workOrders, user, inventory, assets, labor, locations, materials } = this.props

        if (workOrders) {
            this.setState({ loading: false })
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

        if (!materials) {
            getMaterials({ token })
                .then((data) => data.json())
                .then((response) => {
                    console.log(response)
                    if (response.status == 'OK') {
                        console.log(response.payload)
                        dispatch(saveMaterials(response.payload))
                    }
                })
        }


    }

    handleWorkOrderClick = (wonum) => {
        const { localWorkOrders, token, dispatch } = this.props
        // getWorkOrder({ wonum: wonum, token: token })
        //     .then((data) => data.json())
        //     .then((response) => {
        //         if (response.status == 'OK') {
        //             dispatch(saveCurrentWorkOrder(response.payload))
        //             // this.setState({ loading: false })
        //         }
        //     })
        
        if (localWorkOrders && localWorkOrders[wonum]) {
            this.props.history.push('/wo/' + wonum)
            return
        }



        this.setState({ showHazardVerification: true, currentWonum: wonum })

    }

    handleHazardVerificationClick = async (data) => {
        const { token, dispatch } = this.props
        const { currentWonum } = this.state
        if (data.length != 3) {
            this.setState({ showHazardVerification: false })
            return
        }

        console.log('HAZARD_VERIFICATION_SENT')

        this.setState({ loading: true })
        getWorkOrder({ wonum: currentWonum, token: token })
            .then((data) => data.json())
            .then((response) => {
                if (response.status == 'OK') {
                    const localWorkOrder = {
                        wonum: currentWonum,
                        comments: [
                            'Tengo permiso para trabajo Aprobado para trabajos riesgosos',
                            'Cuento con el equipo y protección necesaria',
                            'Realicé LoTo antes de intervenir el equipo'
                        ],
                        laborTransactions: [],
                        materialTransactions: [],
                        attachments: [],
                        ...response.payload
                    }
                   
                    dispatch(saveCurrentWorkOrder(localWorkOrder))
                    dispatch(saveLocalWorkOrder(localWorkOrder))
                    this.setState({ loading: false, showHazardVerification: false })
                    this.props.history.push('/wo/' + currentWonum)

                }
            })

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

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    render() {
        const { workOrders } = this.props
        const { loading, showHazardVerification } = this.state



        return (
            <IonPage>
                <IonHeader style={{ display: loading && 'none' }}>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Dashboard</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={this.handleRefreshClick}><IonIcon icon={refreshOutline}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="dashboard-bg">


                    {
                        workOrders && loading == false ?
                            workOrders.map((wo) => (
                                <WoCard key={wo.wonum} wo={wo} handleWorkOrderClick={this.handleWorkOrderClick} />
                            ))
                            :
                            <Loading />
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


function mapStateToProps({ auth, workOrders, user, inventory, assets, labor, comments, locations, materials, localWorkOrders }) {
    return {
        token: auth && auth.token,
        workOrders: workOrders && workOrders.workOrders,
        user,
        inventory,
        assets,
        labor,
        comments,
        locations,
        materials,
        localWorkOrders: localWorkOrders
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Dashboard))