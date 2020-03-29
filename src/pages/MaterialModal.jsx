import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea, IonAlert
} from '@ionic/react';
import {
    searchOutline, addCircle, swapHorizontalOutline
} from 'ionicons/icons'

import SelectInventoryModal from './SelectInventoryModal'

class MaterialModal extends Component {

    state = {
        selectedLocation: '',
        selectedItem: '',
        showSelectInventoryModal: '',
        showAlert: false,
    }

    handleLocationSelectChange = (e) => {
        console.log(e.target.value)
        this.setState({ selectedLocation: e.target.value })
    }

    handleToggleSelectInventoryModal = (value) => {
        console.log('SHOW_SELECT_INVENTORY_MODAL')
        this.setState({ showSelectInventoryModal: value })
    }

    handleSubmitInventoryClick = (item) => {
        console.log(item)
        this.setState({ showSelectInventoryModal: false, selectedItem: item })
    }

    render() {
        const { locations } = this.props
        const { selectedLocation, selectedItem, showSelectInventoryModal } = this.state

        return (
            <Fragment>
                <IonModal isOpen={this.props.showMaterialModal}>
                    <IonHeader >
                        <IonToolbar color="dark">
                            <IonTitle>Materiales</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent>
                        <IonItem >
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12"><IonLabel className="dataTitle">Almacén</IonLabel>
                                        <IonSelect className="dataField" onIonChange={this.handleLocationSelectChange} value={selectedLocation} placeholder="Seleccionar almacén">
                                            {
                                                locations ?
                                                    Object.values(locations).map((location) => (
                                                        <IonSelectOption key={location._rowstamp} value={location.location}>{location.location}</IonSelectOption>

                                                    ))
                                                    :
                                                    <IonSelectOption value="2"></IonSelectOption>
                                            }
                                        </IonSelect>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>

                        <IonItem >
                            <IonGrid>
                                <IonRow style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                    {
                                        selectedItem
                                            ?
                                            <Fragment>
                                                <IonCol size="10">
                                                    <IonLabel className="dataTitle">Item</IonLabel>
                                                    <IonLabel className="dataField">{selectedItem.itemnum} - {selectedItem.itemDetails.description} </IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={() => this.handleToggleSelectLocationModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={swapHorizontalOutline}></IonIcon></IonButton>
                                                </IonCol>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <IonCol size="10">
                                                    <IonLabel className="dataTitle">Item</IonLabel>
                                                    <IonLabel className="dataField">No hay ningún Item seleccionado</IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={() => { if (!this.state.selectedLocation) { this.setState({ showAlert: true }) } else { this.handleToggleSelectInventoryModal(true) } }} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={addCircle}></IonIcon></IonButton>
                                                </IonCol>
                                            </Fragment>
                                    }
                                </IonRow>
                            </IonGrid>
                        </IonItem>

                        <IonItem >
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel className="dataTitle">Descripción</IonLabel>
                                        <IonTextarea className="dataField" placeholder="Ingresar descripción..."></IonTextarea>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6"><IonLabel className="dataTitle">Existencia</IonLabel></IonCol>
                                    <IonCol size="6"><IonInput className="dataField" placeholder="Ingresar..."></IonInput></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6"><IonLabel className="dataTitle">Estante</IonLabel></IonCol>
                                    <IonCol size="6"><IonInput className="dataField" placeholder="Ingresar..."></IonInput></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6"><IonLabel className="dataTitle">Tarea</IonLabel></IonCol>
                                    <IonCol size="6"><IonInput className="dataField" placeholder="Ingresar..."></IonInput></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>

                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6"><IonLabel className="dataTitle">Cantidad</IonLabel></IonCol>
                                    <IonCol size="6"><IonInput className="dataField" placeholder="Ingresar..."></IonInput></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonContent>
                    <IonRow>
                        <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleMaterialModal(false)}>Cancelar</IonButton></IonCol>
                        <IonCol><IonButton expand="full" onClick={() => this.props.handleToggleMaterialModal(false)}>Aceptar</IonButton></IonCol>
                    </IonRow>
                </IonModal>
                {
                    showSelectInventoryModal == true &&
                    <SelectInventoryModal
                        handleToggleSelectInventoryModal={this.handleToggleSelectInventoryModal}
                        showSelectInventoryModal={showSelectInventoryModal}
                        handleSubmitInventoryClick={this.handleSubmitInventoryClick}
                        selectedLocation={this.state.selectedLocation}
                    />
                }

                <IonAlert
                    isOpen={this.state.showAlert}
                    onDidDismiss={() => this.setState({ showAlert: false })}
                    header={'Alerta'}
                    message={'Selecciona una ubicación en la cual realizar la búsqueda'}
                    buttons={['OK']}
                />
            </Fragment>
        )
    }
}

function mapStateToProps({ auth, locations }) {
    return {
        token: auth.token,
        locations: locations

    }
}

export default connect(mapStateToProps)(MaterialModal)
