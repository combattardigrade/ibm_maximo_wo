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

import SelectMaterialModal from './SelectMaterialModal'

class MaterialModal extends Component {

    state = {
        selectedLocation: '',
        selectedMaterial: '',
        showSelectMaterialModal: false,
        showAlert: false,
        alertTitle: '',
        alertMsg: '',
        materialUsed: '',
        materialTask: '',
    }

    handleLocationSelectChange = (e) => {
        console.log(e.target.value)
        this.setState({ selectedLocation: e.target.value })
    }

    handleToggleSelectMaterialModal = (value) => {
        console.log('SHOW_SELECT_MATERIAL_MODAL')
        this.setState({ showSelectMaterialModal: value })
    }

    handleSelectMaterialBtn = (e) => {
        e.preventDefault()

        if (!this.state.selectedLocation) {
            this.showAlert('Selecciona una ubicación en la cual realizar la búsqueda', 'Error')
            return
        }

        this.handleToggleSelectMaterialModal(true)
    }


    handleSubmitMaterialClick = (material) => {
        console.log(material)
        this.setState({ showSelectMaterialModal: false, selectedMaterial: material,  })
    }    

    handleSubmitMaterialTx = (e) => {
        const { selectedMaterial, materialUsed, materialTask } = this.state

        if(!selectedMaterial) {
            this.showAlert('Selecciona un material', 'Error')
            return
        }

        if(!materialUsed) {
            this.showAlert('Ingresa la cantidad utilizada de material', 'Error')
            return
        }

        this.props.handleSubmitMaterialClick(this.state.selectedMaterial, this.state.materialUsed, this.state.materialTask)
    }

    materialUsedChange = (e) => this.setState({ materialUsed: e.target.value })
    materialTaskChange = (e) => this.setState({materialTask: e.target.value})

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    render() {
        const { locations } = this.props
        const { selectedLocation, selectedMaterial, showSelectMaterialModal } = this.state

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
                                                    <IonSelectOption value="2">No se encontraron almacenes</IonSelectOption>
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
                                        selectedMaterial
                                            ?
                                            <Fragment>
                                                <IonCol size="10">
                                                    <IonLabel className="dataTitle">Material</IonLabel>
                                                    <IonLabel className="dataField">{selectedMaterial.itemnum} - {selectedMaterial.description.substring(0, 30)}... </IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={() => this.handleToggleSelectMaterialModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={swapHorizontalOutline}></IonIcon></IonButton>
                                                </IonCol>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <IonCol size="10">
                                                    <IonLabel className="dataTitle">Material</IonLabel>
                                                    <IonLabel className="dataField">No hay ningún Material seleccionado</IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={this.handleSelectMaterialBtn} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={addCircle}></IonIcon></IonButton>
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
                                        <IonTextarea value={selectedMaterial && selectedMaterial.description} readonly className="dataField" placeholder="Descripción del Material seleccionado"/>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="4"><IonLabel className="dataTitle">Existencia</IonLabel></IonCol>
                                    <IonCol size="8"><IonInput value={selectedMaterial && selectedMaterial.curbal} readonly className="dataField" placeholder="Existencias del Material" /></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="4"><IonLabel className="dataTitle">Estante</IonLabel></IonCol>
                                    <IonCol size="8"><IonInput value={selectedMaterial && selectedMaterial.binnum} readonly className="dataField" placeholder="Estante del Material" /></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="4"><IonLabel className="dataTitle">Cantidad usada</IonLabel></IonCol>
                                    <IonCol size="8"><IonInput value={this.state.materialUsed} onIonChange={this.materialUsedChange} className="dataField" placeholder="Cantidad del Material" /></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="4"><IonLabel className="dataTitle">Tarea</IonLabel></IonCol>
                                    <IonCol size="8"><IonInput value={this.state.materialTask} onIonChange={this.materialTaskChange} className="dataField" placeholder="Tarea en que se utilizó" /></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonContent>
                    <IonRow>
                        <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleMaterialModal(false)}>Cancelar</IonButton></IonCol>
                        <IonCol><IonButton expand="full" onClick={this.handleSubmitMaterialTx}>Aceptar</IonButton></IonCol>
                    </IonRow>
                </IonModal>
                
                {
                    showSelectMaterialModal == true &&
                    <SelectMaterialModal
                        handleToggleSelectMaterialModal={this.handleToggleSelectMaterialModal}
                        showSelectMaterialModal={showSelectMaterialModal}
                        handleSubmitMaterialClick={this.handleSubmitMaterialClick}
                        selectedLocation={this.state.selectedLocation}
                    />
                }

                
                <IonAlert
                    isOpen={this.state.showAlert}
                    header={this.state.alertTitle}
                    message={this.state.alertMsg}
                    buttons={[{
                        text: 'OK',
                        handler: () => {
                            this.setState({ showAlert: false })
                        }
                    }]}
                />
            </Fragment>
        )
    }
}

function mapStateToProps({ auth, locations, workOrders }) {
    return {
        token: auth.token,
        locations: locations,
        currentWorkOrder: workOrders && workOrders.currentWorkOrder
    }
}

export default connect(mapStateToProps)(MaterialModal)
