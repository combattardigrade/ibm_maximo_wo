import React, { Component } from 'react'
import {  IonItem, IonLabel, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';

class WoDetailsHeader extends Component {
    render() {
        const { currentWorkOrder } = this.props
        return (
            <IonItem lines="full" detail button>
                <IonGrid>
                    <IonRow>
                        <IonCol className="dataTitle">Orden de Trabajo</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="3">
                            <IonLabel className="dataSubtitle">Código: </IonLabel>
                            <IonLabel className="dataSubtitle">Descripción: </IonLabel>
                            <IonLabel className="dataSubtitle">Fecha de inicio: </IonLabel>
                            <IonLabel className="dataSubtitle">Activo: </IonLabel>
                        </IonCol>
                        <IonCol size="9">
                            <IonLabel className="dataField">{'wonum' in currentWorkOrder ? currentWorkOrder.wonum : '-'}</IonLabel>
                            <IonLabel className="dataField">{'description' in currentWorkOrder ? currentWorkOrder.description : '-'}</IonLabel>
                            <IonLabel className="dataField">{'targstartdate' in currentWorkOrder ? currentWorkOrder.targstartdate : '-'}</IonLabel>
                            <IonLabel className="dataField">{'assetDescription' in currentWorkOrder ? currentWorkOrder.assetDescription : '-'}</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonItem>
        )
    }
}

export default WoDetailsHeader

