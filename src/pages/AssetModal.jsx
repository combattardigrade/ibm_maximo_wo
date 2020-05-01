import React, { Component } from 'react'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon,
    IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea, IonSpinner
} from '@ionic/react';
import {
    searchOutline
} from 'ionicons/icons'
import { findItem } from '../utils/api'
import './Maximo.css'

class AssetModal extends Component {


    render() {
        const { showAssetModal, asset, modalLoading, assetSafety } = this.props

        if(assetSafety) {
            console.log(assetSafety)
        }

        return (
            <IonModal isOpen={showAssetModal}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Activo {asset.assetnum}</IonTitle>
                        <ion-buttons slot="end">
                            <ion-button onClick={() => this.props.handleToggleAssetModal(false)}>Cerrar</ion-button>
                        </ion-buttons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {
                        asset
                            ?
                            <div>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Código</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'assetnum' in asset ? asset.assetnum : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'description' in asset ? asset.description : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Cógigo ubicación</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'location' in asset ? asset.location : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción ubicación</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'location_description' in asset ? asset.location_description : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Código de familia</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'gb_assetfamily' in asset ? asset.gb_assetfamily : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción de familia</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'gb_assetfamily_description' in asset ? asset.gb_assetfamily_description : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Estado del activo</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'status' in asset ? asset.status : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Prioridad</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'priority' in asset ? asset.priority : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Clasificación ABC</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'gb_abc' in asset ? asset.gb_abc : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción clasificación ABC</IonLabel></IonCol>

                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'gb_abc_description' in asset ? asset.gb_abc_description : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Tipo de activo</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'assettype' in asset ? asset.assettype : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Número de serie</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'serialnum' in asset ? asset.serialnum : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Modelo</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'eq1' in asset ? asset.eq1 : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Código nivel superior</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'parent' in asset ? asset.parent : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción del nivel superior</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'parent_description' in asset ? asset.parent_description : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Fecha de instalación</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'installdate' in asset ? asset.installdate : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Precio de compra</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'purchaseprice' in asset ? asset.purchaseprice : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Tiempo de inactividad</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'totdowntime' in asset ? asset.totdowntime : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Código del componente</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>-</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Código de repuesto</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">-</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción de repuesto</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>-</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción detallada de repuesto</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>-</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Cantidad de repuesto</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>-</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Código de riesgo</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{ assetSafety.length > 0 ? assetSafety[0].hazardId : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción de riesgo</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{ assetSafety.length > 0 ? assetSafety[0].hazardDescription : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Código de precaución</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{ assetSafety.length > 0 ? assetSafety[0].precautionId : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción de precaución</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{ assetSafety.length > 0 ? assetSafety[0].precautionDescription : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Planta</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>{'siteid' in asset ? asset.siteid : '-'}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol><IonLabel className="dataTitle">Descripción de planta</IonLabel></IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol><IonLabel>-</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            </div>
                            :
                            <div className="spinnerCenter">
                                {
                                    modalLoading == true && <IonSpinner name="crescent" style={{ textAlign: 'center' }} />
                                }
                            </div>
                    }

                </IonContent>

            </IonModal>
        )
    }
}

export default AssetModal;