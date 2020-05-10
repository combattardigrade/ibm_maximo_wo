import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonTextarea } from '@ionic/react';
import { checkmarkOutline, closeCircle, addCircleOutline, hourglassOutline } from 'ionicons/icons'

// Components
import WoDetailsHeader from '../components/WODetailsHeader'

// Styles
import './Page.css';

// Actions
import { deleteAttachment } from '../actions/localWorkOrders'

// Plugins
import { PhotoViewer } from '@ionic-native/photo-viewer'

// Libraries
const moment = require('moment')

class WoActual extends Component {

    handleDeletePhoto = (photoIndex) => {
        const { currentWorkOrder, dispatch } = this.props
        dispatch(deleteAttachment({ wonum: currentWorkOrder.wonum, index: photoIndex }))
    }

    render() {
        const { currentWorkOrder, handleToggleMaterialModal, localWorkOrder } = this.props

        return (
            <IonContent>
                <WoDetailsHeader currentWorkOrder={currentWorkOrder} />

                <IonItem lines="full">
                    <IonLabel className="dataTitle">Mano de obra:</IonLabel>
                </IonItem>
                {
                    localWorkOrder && 'laborTransactions' in localWorkOrder
                        ?
                        localWorkOrder.laborTransactions.map((labor, index) => {
                            let start = moment(labor.starttime)
                            let end = moment(labor.finishdatetime)
                            let duration = moment.duration(end.diff(start))
                            let hours = (duration.asHours()).toFixed(2)

                            return (
                                <IonItem lines="full" key={index}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                                <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={checkmarkOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="10">
                                                <IonRow>
                                                    <IonCol size="6">
                                                        <IonLabel className="dataField"><span className="dataSubtitle">Oficio:</span> {'craft' in labor ? labor.person[0].craft : '-'}</IonLabel>
                                                        <IonLabel className="dataField"><span className="dataSubtitle">Duración:</span> {hours ? hours : '0'} hrs</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="4">
                                                        <IonLabel className="dataField"><span className="dataSubtitle">Tarea:</span> {'taskid' in labor ? labor.taskid : '-'}</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            )
                        })
                        : <IonItem><IonLabel className="dataField">No se encontraron registros</IonLabel></IonItem>
                }



                <IonItem>
                    <IonLabel className="dataTitle">Materiales:</IonLabel>
                </IonItem>

                {
                    localWorkOrder && 'materialTransactions' in localWorkOrder ?
                        localWorkOrder.materialTransactions.map((material, index) => (
                            <IonItem lines="full" key={index}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2" style={{ textAlign: 'center' }}>
                                            <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={checkmarkOutline}></IonIcon>
                                        </IonCol>
                                        <IonCol size="10">
                                            <IonRow>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Material:</span> {material.description.substring(0,15)}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Código:</span> {material.itemnum.substring(0,15)} </IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Almacén:</span> {material.storelocsite}</IonLabel>
                                                </IonCol>
                                                <IonCol size="5">
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Cantidad:</span> {material.itemqty}</IonLabel>
                                                    <IonLabel className="dataField"><span className="dataSubtitle">Cantidad usada:</span> {material.itemqtyused}</IonLabel>
                                                </IonCol>

                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        ))
                        : <IonItem><IonLabel className="dataField">No se encontraron registros</IonLabel></IonItem>

                }

                <IonItem>
                    <IonLabel className="dataTitle">Comentarios:</IonLabel>
                </IonItem>
                <IonItem>
                    <IonGrid>
                        {
                            localWorkOrder && 'comments' in localWorkOrder
                                ?
                                localWorkOrder.comments.map((comment, i) => (
                                    <IonRow key={i}>
                                        <IonCol size="12">
                                            <IonLabel className="dataField">{comment}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                ))
                                :
                                <IonRow><IonCol><IonLabel className="dataField">No se encontraron registros</IonLabel></IonCol></IonRow>
                        }
                    </IonGrid>

                </IonItem>


                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel className="dataTitle">Adjuntos:</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            {
                                localWorkOrder && 'attachments' in localWorkOrder && localWorkOrder.attachments.length > 0
                                    ?
                                    localWorkOrder.attachments.map((photo, i) => (
                                        <IonCol size="3" key={i}>
                                            <IonButton onClick={e => { e.preventDefault(); this.handleDeletePhoto(i) }} color="danger" style={{ position: 'absolute', right: '0' }} fill="clear"><IonIcon icon={closeCircle}></IonIcon></IonButton>
                                            <img onClick={e => { e.preventDefault(); PhotoViewer.show(`data:image/jpeg;base64,${photo}`); }} style={{ height: '100%', width: '100%', marginTop: '10px', borderRadius: '5px' }} src={`data:image/jpeg;base64,${photo}`} />
                                        </IonCol>
                                    ))
                                    :
                                    <IonRow><IonCol><IonLabel className="dataField">No hay archivos adjuntos</IonLabel></IonCol></IonRow>
                            }
                        </IonRow>
                    </IonGrid>

                </IonItem>

            </IonContent >

        );
    }
};

function mapStateToProps() {
    return {
       
    }
}

export default connect(mapStateToProps)(WoActual)
