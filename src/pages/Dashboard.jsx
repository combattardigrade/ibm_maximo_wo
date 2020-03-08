import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol } from '@ionic/react';

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { getWorkOrders, getWhoAmI } from '../utils/api'
import { saveWorkOrders } from '../actions/workOrders'
import { saveUser } from '../actions/user'
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
        }
        catch (e) {
            console.log(e)
            this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
            return
        }


        try {
            response = await (await getWhoAmI({ token: token })).json()
            if (!('status' in response) || response.status == 'ERROR') {
                console.log(response)
                return
            }
            dispatch(saveUser(response.payload))
        }
        catch (e) {
            console.log(e)
            return
        }
    }

    handleWorkOrderClick = async (wonum) => {        
        // got to wo details
        this.props.history.push('/wo/' + wonum)
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
                                    {/* Work Order */}
                                    <IonRow >
                                        <IonCol size="4">
                                            <IonLabel className="dataTitle">Código</IonLabel>
                                            <IonLabel className="dataField">{'wonum' in wo ? wo.wonum : '-'}</IonLabel>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel className="dataTitle">Tipo</IonLabel>
                                            <IonLabel className="dataField">{'worktype' in wo ? wo.worktype : '-'}</IonLabel>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel className="dataTitle">Fecha Inicio</IonLabel>
                                            <IonLabel className="dataField">{'targstartdate' in wo ? wo.targstartdate : '-'}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow style={{ fontSize: '12px' }}>
                                        <IonCol size="4">
                                            <IonLabel className="dataTitle">Duración: </IonLabel>
                                            <IonLabel  className="dataField">{'estdur' in wo ? wo.estdur.toFixed(2) : '-'}</IonLabel>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel className="dataTitle">Prioridad: </IonLabel>
                                            <IonLabel  className="dataField">{'wopriority' in wo ? wo.wopriority : '-'}</IonLabel>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel className="dataTitle">Estado: </IonLabel>
                                            <IonLabel  className="dataField">{'status' in wo ? wo.status : '-'}</IonLabel>
                                        </IonCol>                                        
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="8">
                                            <IonLabel className="dataTitle">Descripción</IonLabel>
                                            <IonLabel className="dataField">{'description' in wo ? wo.description : '-'}</IonLabel>
                                        </IonCol>
                                         
                                        <IonCol size="4">
                                            <IonLabel className="dataTitle">Criterio</IonLabel>
                                            <IonLabel className="dataField">{'gb_abc' in wo ? wo.gb_abc : '-'}</IonLabel>
                                        </IonCol>
                                    </IonRow>

                                    {/* Asset */}
                                    <IonRow>
                                        <IonCol size="8" >
                                            <IonLabel className="dataTitle">Activo</IonLabel>
                                            <IonLabel className="dataField">{'asset' in wo ? wo.asset.description : '-'}</IonLabel>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonLabel className="dataTitle">Código</IonLabel>
                                            <IonLabel className="dataField">{'assetnum' in wo ? wo.assetnum : '-'}</IonLabel>
                                        </IonCol>
                                    </IonRow>

                                    {/* Location */}
                                    <IonRow >
                                        <IonCol size="8">
                                            <IonLabel className="dataTitle">Ubicación</IonLabel>
                                            <IonLabel className="dataField">{'location' in wo ? wo.location.description : '-'}</IonLabel>
                                        </IonCol>
                                        <IonCol size="4">                                            
                                            <IonLabel className="dataTitle">Código</IonLabel>
                                            <IonLabel className="dataField">{'$alias_this_attr$location' in wo ? wo.$alias_this_attr$location : '-'}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    

                                    <IonRow style={{ fontSize: '12px' }}>
                                       
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