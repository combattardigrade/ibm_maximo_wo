import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol } from '@ionic/react';

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { getWorkOrders } from '../utils/api'
import { saveWorkOrders } from '../actions/workOrders'
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class Dashboard extends Component {

    async componentDidMount() {
        const { token, dispatch } = this.props

        let response
        try {
            response = await (await getWorkOrders({ token: token })).json()
            if (!('status' in response) || response.status == 'ERROR') {
                console.log(response)
                this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                return
            }
            
            dispatch(saveWorkOrders(response.payload))

            // render work orders


        }
        catch (e) {
            console.log(e)
            this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
            return
        }
    }

    handleWorkOrderClick = async (wonum) => {
        console.log(wonum)
        // got to wo details
        this.props.history.replace('/wo/' + wonum)
    }

    async showAlert(message) {
        await Modals.alert({
            title: 'Error',
            message,
        })
    }

    render() {
        const { workOrders } = this.props

        if (!workOrders) {
            return "Loading"
        }

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
                        workOrders.map((wo) => (
                            <IonItem key={wo.wonum} lines="full" button detail onClick={e => { e.preventDefault(); this.handleWorkOrderClick(wo.wonum); }} data-wonum={wo.wonum}>
                                <IonGrid>
                                    <IonRow >
                                        <IonCol size="4">
                                            <IonLabel>{wo.wonum}</IonLabel>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel>TIPO {wo.worktype}</IonLabel>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel>{wo.targstartdate}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="12">{wo.description}</IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="12" style={{fontSize:'12px'}}>{wo.asset.description}</IonCol>
                                    </IonRow>
                                    <IonRow style={{ fontSize: '12px' }}>
                                        <IonCol >{wo.assetnum}</IonCol>
                                        <IonCol >CRITERIO {wo.gb_abc}</IonCol>
                                    </IonRow>
                                    <IonRow style={{ fontSize: '12px' }}>
                                        <IonCol >{wo.$alias_this_attr$location}</IonCol>
                                    </IonRow>
                                    <IonRow style={{ fontSize: '12px' }}>
                                        <IonCol >{wo.location.description}</IonCol>
                                    </IonRow>
                                    <IonRow style={{ fontSize: '12px' }}>
                                        <IonCol>DURACIÓN: {wo.estdur.toFixed(2)}</IonCol>
                                        <IonCol>PRIORIDAD: {wo.wopriority}</IonCol>
                                        <IonCol>{wo.status}</IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        ))
                    }


                </IonContent>
            </IonPage>
        );
    }
};


function mapStateToProps({ auth, workOrders }) {
    return {
        token: auth.token,
        workOrders: workOrders.workOrders

    }
}

export default connect(mapStateToProps)(Dashboard)