import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel,
    IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonInput, IonButton,
    IonSelect, IonSelectOption, IonSpinner

} from '@ionic/react';
import {
    addOutline, peopleOutline, hammerOutline, documentTextOutline, cameraOutline,
    documentAttachOutline, chevronBackOutline, cubeOutline, layersOutline
} from 'ionicons/icons'

import './Page.css';
import './Maximo.css'
import { Plugins } from '@capacitor/core'
import { getWorkOrders, findWorkOrder } from '../utils/api'
import { saveWorkOrders } from '../actions/workOrders'
import WoCard from '../components/WoCard'
const { Modals } = Plugins
// Modals


class WoSearch extends Component {

    state = {        
        loading: false,
        searchMethod: 'wonum',
        searchValue: '',
    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSelectChange = (e) => {
        this.setState({ searchMethod: e.target.value })
    }

    handleWorkOrderClick = async (wonum) => {
        this.props.history.push('/wo/' + wonum)
    }

    showAlert(message) {
        Modals.alert({
            title: 'Error',
            message,
        })
    }    

    handleSearchClick = (e) => {
        e.preventDefault()
        const { searchMethod, searchValue } = this.state
        const { token, dispatch } = this.props
        this.setState({ loading: true })

        if (!searchValue || !searchMethod) {
            getWorkOrders({ token: token })
            .then(data => data.json())
            .then(response => {
                if (!('status' in response) || response.status == 'ERROR') {
                    console.log(response)
                    this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                    return
                }
                dispatch(saveWorkOrders(response.payload))
                this.setState({loading: false})
            })
            .catch((err) => {
                console.log(err)
                this.showAlert('Ocurrió un error al intentar obtener las órdenes de trabajo. Por favor, inténtalo nuevamente')
                return
            })
            return
        }
        
        findWorkOrder({ method: searchMethod, value: searchValue, token: token })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveWorkOrders(response.payload))
                    this.setState({ loading: false })
                }
            })
    }

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

    }

    render() {
        const { loading, showItemModal } = this.state
        const { workOrders } = this.props

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start" onClick={e => { e.preventDefault(); this.handleBackBtn() }}>
                            <IonIcon style={{ fontSize: '28px' }} icon={chevronBackOutline}></IonIcon>
                        </IonButtons>
                        <IonTitle>Búsqueda de Órdenes de Trabajo</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonGrid style={{ borderBottom: '1px solid #dedede' }}>
                        <IonRow >
                            <IonCol size="4" style={{ paddingTop: '15px', fontWeight: 'bold' }}><IonLabel >Buscar por:</IonLabel></IonCol>
                            <IonCol size="8">
                                <IonSelect onIonChange={this.handleSelectChange} style={{ maxWidth: '100% !important', width: '100% !important' }} interface="popover" value={this.state.searchMethod} placeholder="Selecciona método">
                                    <IonSelectOption value="wonum">Código</IonSelectOption>
                                    <IonSelectOption value="description">Descripción</IonSelectOption>
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow >
                            <IonCol>
                                <IonInput onIonChange={this.handleInputChange} value={this.state.searchValue} placeholder="Búsqueda de Orden de Trabajo"></IonInput>
                            </IonCol>
                            <IonCol>
                                <IonButton onClick={this.handleSearchClick} expand="block">Buscar</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    {
                        workOrders && loading == false
                            ?
                            workOrders.map((wo) => (
                                <WoCard key={wo.wonum} wo={wo} handleWorkOrderClick={this.handleWorkOrderClick}></WoCard>
                            ))
                            :
                            <div className="spinnerCenter">
                                {
                                    loading ? <IonSpinner name="crescent" style={{ textAlign: 'center' }} /> : <IonLabel>No se encontraron resultados</IonLabel>
                                }
                            </div>
                    }
                    
                </IonContent>
            </IonPage>
        );
    }
};

function mapStateToProps({ auth, workOrders, inventory }) {
    return {
        token: auth.token,
        workOrders: workOrders && workOrders.workOrders
    }
}

export default connect(mapStateToProps)(WoSearch)
