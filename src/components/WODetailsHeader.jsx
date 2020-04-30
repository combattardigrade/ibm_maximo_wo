import React, { Component, Fragment } from 'react'
import { IonItem, IonLabel, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';

import WoLongDescModal from '../pages/WoLongDescModal'

class WoDetailsHeader extends Component {

    state = {
        showLongDescModal: false
    }

    handleToggleLongDescModal = (value) => {
        this.setState({ showLongDescModal: value })
    }

    render() {
        const { currentWorkOrder } = this.props
        const { showLongDescModal } = this.state
       
        return (
            <Fragment>
                <IonItem lines="full" detail button onClick={e => { e.preventDefault();  this.handleToggleLongDescModal(true)} }>
                    <IonGrid>
                        <IonRow>
                            <IonCol className="dataTitle">Orden de Trabajo</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                <IonLabel className="dataSubtitle">Código: </IonLabel>
                                
                                
                                
                            </IonCol>
                            <IonCol size="9">
                                <IonLabel className="dataField">{'wonum' in currentWorkOrder ? currentWorkOrder.wonum : '-'}</IonLabel>
                                
                                
                                
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3"><IonLabel className="dataSubtitle">Descripción: </IonLabel></IonCol>
                            <IonCol size="9"><IonLabel className="dataField">{'description' in currentWorkOrder ? currentWorkOrder.description : '-'}</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3"><IonLabel className="dataSubtitle">Fecha de inicio: </IonLabel></IonCol>
                            <IonCol size="9"><IonLabel className="dataField">{'targstartdate' in currentWorkOrder ? currentWorkOrder.targstartdate : '-'}</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3"><IonLabel className="dataSubtitle">Activo: </IonLabel></IonCol>
                            <IonCol size="9"><IonLabel className="dataField">{'assetDescription' in currentWorkOrder ? currentWorkOrder.assetDescription : '-'}</IonLabel></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <WoLongDescModal currentWorkOrder={currentWorkOrder} handleToggleLongDescModal={this.handleToggleLongDescModal} showLongDescModal={showLongDescModal} />
            </Fragment>
        )
    }
}

export default WoDetailsHeader

