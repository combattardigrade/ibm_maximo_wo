import React, { Component } from 'react'
import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel,
    IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonInput, IonButton,
    IonSelect, IonSelectOption, IonSpinner

} from '@ionic/react';

class WoCard extends Component {
    render() {
        const { wo, handleWorkOrderClick } = this.props

        return (
            <IonItem className="wo-card" key={wo.wonum} lines="full" button detail  onClick={e => { e.preventDefault(); handleWorkOrderClick(wo.wonum); }} data-wonum={wo.wonum}>
                <IonGrid style={{padding:'15px 5px'}}>
                    {/* Work Order */}
                    <IonRow style={{}}>
                        <IonCol>
                            <IonLabel style={{fontWeight:'bold', fontSize:'1.5em', color: '#005cff'}}>Orden #{'wonum' in wo ? wo.wonum : '-'}</IonLabel>
                        </IonCol>
                    </IonRow>
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
                            <IonLabel className="dataTitle">Fecha Programada</IonLabel>
                            <IonLabel className="dataField">{'targstartdate' in wo ? wo.targstartdate : '-'}</IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="4">
                            <IonLabel className="dataTitle">Duración: </IonLabel>
                            <IonLabel className="dataField">{'estdur' in wo ? wo.estdur.toFixed(2) : '-'}</IonLabel>
                        </IonCol>
                        <IonCol size="4">
                            <IonLabel className="dataTitle">Prioridad: </IonLabel>
                            <IonLabel className="dataField">{'wopriority' in wo ? wo.wopriority : '-'}</IonLabel>
                        </IonCol>
                        <IonCol size="4">
                            <IonLabel className="dataTitle">Estado: </IonLabel>
                            <IonLabel className="dataField">{'status' in wo ? wo.status : '-'}</IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="8">
                            <IonLabel className="dataTitle">Descripción</IonLabel>
                            <IonLabel className="dataField" >{'description' in wo ? wo.description.substring(0,40) : '-'}</IonLabel>
                        </IonCol>

                        {/* <IonCol size="4">
                            <IonLabel className="dataTitle">Criterio</IonLabel>
                            <IonLabel className="dataField">{'gb_abc' in wo ? wo.gb_abc : '-'}</IonLabel>
                        </IonCol> */}
                    </IonRow>

                    {/* Asset */}
                    <IonRow>
                        <IonCol size="8" >
                            <IonLabel className="dataTitle">Activo</IonLabel>
                            <IonLabel  className="dataField">{'asset' in wo ? wo.asset.description.substring(0,10) : '-'}</IonLabel>
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
        )
    }
}

export default WoCard