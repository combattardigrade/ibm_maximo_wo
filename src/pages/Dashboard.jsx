import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonSpinner, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import {
    refreshOutline
} from 'ionicons/icons'
import './Page.css';
import './Maximo.css'
import { getWorkOrders, getWhoAmI, getInventory, getAssets, getWorkOrder, getWOSafety } from '../utils/api'
import { saveWorkOrders, saveCurrentWorkOrder, saveWorkOrderSafety } from '../actions/workOrders'
import { saveUser } from '../actions/user'
import { saveInventory } from '../actions/inventory'
import { saveAssets } from '../actions/assets'
import WoCard from '../components/WoCard'
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class Dashboard extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        const { token, dispatch, workOrders, user, inventory, assets } = this.props

        if(workOrders && user && inventory && assets) {
            this.setState({loading: false})
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

        if(!inventory) {
            getInventory({ token: token })
            .then(data => data.json())
            .then((response) => {
                if (response.status == 'OK') {
                    dispatch(saveInventory(response.payload))
                }
            })
            .catch((err) => console.log(err))
        }

        if(!assets) {
            getAssets({ token: token })
            .then(data => data.json())
            .then((response) => {
                if (response.status == 'OK') {
                    dispatch(saveAssets(response.payload))
                }
            })
            .catch((err) => console.log(err))
        }

    }

    handleWorkOrderClick = async (wonum) => {
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
        const { loading } = this.state

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
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


                </IonContent>
            </IonPage>
        );
    }
};


function mapStateToProps({ auth, workOrders, user, inventory, assets }) {
    return {
        token: auth.token,
        workOrders: workOrders && workOrders.workOrders,
        user,
        inventory,
        assets
    }
}

export default connect(mapStateToProps)(Dashboard)