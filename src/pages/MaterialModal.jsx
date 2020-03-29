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
    }

    handleLocationSelectChange = (e) => {
        console.log(e.target.value)
        this.setState({ selectedLocation: e.target.value })
    }

    handleToggleSelectMaterialModal = (value) => {
        const { handleToggleMaterialModal } = this.props
        // handleToggleMaterialModal(false)
        console.log('SHOW_SELECT_MATERIAL_MODAL')
        this.setState({ showSelectMaterialModal: value })
    }

    handleSubmitMaterialClick = (material) => {
        console.log(material)
        this.setState({ showSelectMaterialModal: false, selectedMaterial: material })
        
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
                                        selectedMaterial
                                            ?
                                            <Fragment>
                                                <IonCol size="10">
                                                    <IonLabel className="dataTitle">Material</IonLabel>
                                                    <IonLabel className="dataField">{selectedMaterial.itemnum} - {selectedMaterial.description.substring(0,30)}... </IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={() => this.handleToggleSelectLocationModal(true)} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={swapHorizontalOutline}></IonIcon></IonButton>
                                                </IonCol>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <IonCol size="10">
                                                    <IonLabel className="dataTitle">Material</IonLabel>
                                                    <IonLabel className="dataField">No hay ningún Material seleccionado</IonLabel>
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonButton onClick={() => { if (!this.state.selectedLocation) { this.setState({ showAlert: true }) } else { this.handleToggleSelectMaterialModal(true) } }} color="primary" expand="full" fill="clear"><IonIcon style={{ fontSize: '2em' }} icon={addCircle}></IonIcon></IonButton>
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
                                <IonTextarea readonly className="dataField" placeholder="Descripción del Material seleccionado">{ selectedMaterial && selectedMaterial.description}</IonTextarea>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6"><IonLabel className="dataTitle">Existencia</IonLabel></IonCol>
                                <IonCol size="6"><IonInput readonly className="dataField" placeholder="Existencias del Material">{ selectedMaterial && selectedMaterial.curbal }</IonInput></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6"><IonLabel className="dataTitle">Estante</IonLabel></IonCol>
                                    <IonCol size="6"><IonInput readonly className="dataField" placeholder="Estante del Material">{ selectedMaterial && selectedMaterial.binnum }</IonInput></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6"><IonLabel className="dataTitle">Tarea</IonLabel></IonCol>
                                    <IonCol size="6"><IonInput readonly className="dataField" placeholder="Tarea del Material"></IonInput></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>

                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6"><IonLabel className="dataTitle">Cantidad</IonLabel></IonCol>
                                    <IonCol size="6"><IonInput readonly className="dataField" placeholder="Cantidad del Material">{ selectedMaterial && selectedMaterial.binnum }</IonInput></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonContent>
                    <IonRow>
                        <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleMaterialModal(false)}>Cancelar</IonButton></IonCol>
                        <IonCol><IonButton expand="full" onClick={() => this.props.handleToggleMaterialModal(false)}>Aceptar</IonButton></IonCol>
                    </IonRow>
                </IonModal>
                { console.log(this.state.showSelectMaterialModal)}
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
