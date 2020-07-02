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

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import './Maximo.css'
import { Plugins } from '@capacitor/core'
import { getInventory, findInventoryItem } from '../utils/api'
import { saveInventory } from '../actions/inventory'
import ItemModal from './ItemModal'
const { Modals } = Plugins
// Modals


class Inventory extends Component {

    state = {
        inventory: '',
        loading: true,
        searchMethod: 'itemnum',
        searchValue: '',
        showItemModal: false,
        item: '',
        modalLoading: false
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

    handleSearchClick = (e) => {
        e.preventDefault()
        const { searchMethod, searchValue } = this.state
        const { token, dispatch } = this.props
        this.setState({ loading: true, inventory: '' })

        if (!searchValue || !searchMethod) {
            getInventory({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveInventory(response.payload))
                        this.setState({ loading: false })
                    }
                })
            return
        }
        console.log(searchMethod)
        findInventoryItem({ method: searchMethod, value: searchValue, token: token })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                if (response.status == 'OK') {
                    dispatch(saveInventory(response.payload))
                    this.setState({ loading: false })
                }
            })
    }
    showAlert(message) {
        Modals.alert({
            title: 'Error',
            message,
        })
    }

    handleToggleItemModal = (value) => {
        this.setState({ showItemModal: value })
    }

    handleItemClick = (_rowstamp) => {
        const { inventory } = this.props
        this.setState({ showItemModal: true, modalLoading: true })
        const item = inventory.filter(i => i._rowstamp == _rowstamp)
        console.log(item)
        this.setState({ item: item[0], loading: false })
        return false
    }

    componentDidMount() {
        const { token, inventory, dispatch } = this.props

        if (!inventory) {
            getInventory({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        dispatch(saveInventory(response.payload))
                    }
                })
        } else {
            this.setState({ loading: false })
        }
    }

    render() {
        const { loading, showItemModal } = this.state
        const { inventory } = this.props

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonButtons slot="start" onClick={e => { e.preventDefault(); this.handleBackBtn() }}>
                            <IonIcon style={{ fontSize: '28px' }} icon={chevronBackOutline}></IonIcon>
                        </IonButtons>
                        <IonTitle>Inventario</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonGrid style={{ borderBottom: '1px solid #dedede' }}>
                        <IonRow >
                            <IonCol size="4" style={{ paddingTop: '15px', fontWeight: 'bold' }}><IonLabel >Buscar por:</IonLabel></IonCol>
                            <IonCol size="8">
                                <IonSelect onIonChange={this.handleSelectChange} style={{ maxWidth: '100% !important', width: '100% !important' }} interface="popover" value={this.state.searchMethod} placeholder="Selecciona método">
                                    <IonSelectOption value="itemnum">itemnum</IonSelectOption>
                                    <IonSelectOption value="location">ubicación</IonSelectOption>
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow >
                            <IonCol>
                                <IonInput onIonChange={this.handleInputChange} value={this.state.searchValue} placeholder="Búsqueda en inventario"></IonInput>
                            </IonCol>
                            <IonCol>
                                <IonButton onClick={this.handleSearchClick} expand="block">Buscar</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    {
                        inventory && loading == false
                            ?
                            inventory.map((item) => (

                                <IonItem key={item._rowstamp} button detail onClick={e => { e.preventDefault(); this.handleItemClick(item._rowstamp) }}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                                <IonIcon className="searchResultIcon" icon={layersOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="10">
                                                <IonRow>
                                                    <IonCol size="12">
                                                        <IonLabel className="dataTitle" style={{ whiteSpace: 'normal', overflow: 'hidden', display: 'block' }}>Item</IonLabel>
                                                        <IonLabel className="dataField">{item.itemDetails.description.length < 30 ? item.itemDetails.description : item.itemDetails.description.substring(1, 30) + '...'}</IonLabel>
                                                    </IonCol>

                                                </IonRow>
                                                <IonRow>
                                                    <IonCol size="4">
                                                        <IonLabel className="dataTitle">Código</IonLabel>
                                                        <IonLabel className="dataField">{item.itemnum}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="4">
                                                        <IonLabel className="dataTitle">Almacén</IonLabel>
                                                        <IonLabel className="dataField">{item.location}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="4">
                                                        <IonLabel className="dataTitle">Planta:</IonLabel>
                                                        <IonLabel className="dataField">{item.siteid}</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            ))
                            :
                            <div className="spinnerCenter">
                                {
                                    loading ? <IonSpinner name="crescent" style={{ textAlign: 'center' }} /> : <IonLabel>No se encontraron resultados</IonLabel>
                                }
                            </div>
                    }
                    <ItemModal handleToggleItemModal={this.handleToggleItemModal} showItemModal={showItemModal} item={this.state.item} modalLoading={this.state.modalLoading} />
                </IonContent>
            </IonPage>
        );
    }
};

function mapStateToProps({ auth, workOrders, inventory }) {
    return {
        token: auth.token,
        inventory: inventory.inventory
    }
}

export default connect(mapStateToProps)(Inventory)
