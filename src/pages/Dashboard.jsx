import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonSpinner, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol } from '@ionic/react';

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
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

    componentDidMount() {
        const { token, dispatch } = this.props

        getWorkOrders({ token: token })
            .then(data => data.json())
            .then(response => {
                if (!('status' in response) || response.status == 'ERROR') {
                    console.log(response)
                    this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                    return
                }
                dispatch(saveWorkOrders(response.payload))
            })
            .catch((err) => {
                console.log(err)
                this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                return
            })


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

        getInventory({ token: token })
            .then(data => data.json())
            .then((response) => {
                if (response.status == 'OK') {
                    dispatch(saveInventory(response.payload))
                }
            })
            .catch((err) => console.log(err))

        getAssets({ token: token })
            .then(data => data.json())
            .then((response) => {
                if (response.status == 'OK') {
                    dispatch(saveAssets(response.payload))
                }
            })
            .catch((err) => console.log(err))

    }

    handleWorkOrderClick = async (wonum) => {
        // const { token, dispatch } = this.props
        // got to wo details
        this.props.history.push('/wo/' + wonum)
        // getWorkOrder({ wonum: wonum, token: token })
        //     .then((data) => data.json())
        //     .then((response) => {
        //         if (response.status == 'OK') {
        //             dispatch(saveCurrentWorkOrder(response.payload))
        //             // this.setState({ loading: false })
        //         }
        //     })

        // getWOSafety({ wonum: wonum, token: token })
        //     .then((data) => data.json())
        //     .then((response) => {
        //         if (response.status == 'OK') {
        //             dispatch(saveWorkOrderSafety(response.payload))

        //         }
        //     })

    }

    async showAlert(message) {
        await Modals.alert({
            title: 'Error',
            message,
        })
    }

    render() {
        const { workOrders } = this.props

        // if (!workOrders) {
        //     return <div className="spinnerCenter">
        //         <IonSpinner name="crescent" style={{ textAlign: 'center' }} />
        //     </div>
        // }

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Dashboard</IonTitle>
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
                        workOrders ?
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


function mapStateToProps({ auth, workOrders }) {
    return {
        token: auth.token,
        workOrders: workOrders && workOrders.workOrders

    }
}

export default connect(mapStateToProps)(Dashboard)