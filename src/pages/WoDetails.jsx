import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonIcon, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
    IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonButton,
    IonToast, IonAlert,
} from '@ionic/react';
import {
    timeOutline, clipboardOutline, paperPlaneOutline
} from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import WoDetailsHeader from '../components/WODetailsHeader';
import './Page.css';
import './Maximo.css'


// Components
import Timer from 'react-compound-timer'


// API
import { updateWOStatus } from '../utils/api'

// Actions
import { updateCurrentWOStatus } from '../actions/workOrders'


class WoDetails extends Component {

    state = {
        showToast: false,
        serverMsg: '',
        serverStatus: '',
        timerActive: false,
        showCompleteWOVerification: false,
    }


    handleStartWO = (e) => {
        e.preventDefault()

        const { currentWorkOrder, token, dispatch } = this.props
        const woHref = currentWorkOrder.href
        const status = 'INPRG'

        updateWOStatus({ woHref, status, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    // update local status
                    dispatch(updateCurrentWOStatus(status))
                    // show toast
                    this.setState({
                        showToast: true, serverMsg: res.message, serverStatus: 'OK'
                    })
                }
            })
    }

    

    handleStartTimer = (e) => {
        e.preventDefault()
        this.setState({ timerActive: true })
    }


    render() {
        const { currentWorkOrder, safetyDetails } = this.props

        if (!currentWorkOrder) {
            return <div>Loading</div>
        }


        return (
            <IonContent>
                {/* WO */}
                <WoDetailsHeader currentWorkOrder={currentWorkOrder} />
                {/* ASSET */}
               
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol className="dataTitle">Activo</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel className="dataField">{'assetDescription' in currentWorkOrder ? currentWorkOrder.assetDescription : '-'}</IonLabel>
                                <IonLabel className="dataField">{'assetnum' in currentWorkOrder ? currentWorkOrder.assetnum : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol className="dataTitle">Ubicación</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel className="dataField">{'locationDetails' in currentWorkOrder ? currentWorkOrder.locationDetails.locations.description : '-'}</IonLabel>
                                <IonLabel className="dataField">{'location' in currentWorkOrder ? currentWorkOrder.location : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Criterio: </IonLabel>
                                <IonLabel className="dataField">{'gb_abc' in currentWorkOrder ? currentWorkOrder.gb_abc : '-'}</IonLabel>
                            </IonCol>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Prioridad: </IonLabel>
                                <IonLabel className="dataField">{'wopriority' in currentWorkOrder ? currentWorkOrder.wopriority : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Tipo: </IonLabel>
                                <IonLabel className="dataField">{'worktype' in currentWorkOrder ? currentWorkOrder.worktype : '-'}</IonLabel>
                            </IonCol>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Duración: </IonLabel>
                                <IonLabel className="dataField">{'estdur' in currentWorkOrder ? currentWorkOrder.estdur.toFixed(2) : '-'} hrs</IonLabel>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataTitle">Inicio programado</IonLabel>
                                <IonLabel className="dataField">{'targstartdate' in currentWorkOrder ? currentWorkOrder.targstartdate : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <IonLabel className="dataTitle">Estado OT: </IonLabel>
                                <IonLabel className="dataField">{'status' in currentWorkOrder ? currentWorkOrder.status : '-'}</IonLabel>
                            </IonCol>
                            <IonCol size="6">
                                {
                                    currentWorkOrder.status === 'APPR'
                                        ?
                                        <IonButton onClick={this.handleStartWO} color="light" expand="full">INICIAR</IonButton>
                                        :
                                        <IonButton onClick={this.props.handleCompleteWO} color="light" expand="full">FINALIZAR</IonButton>
                                    // this.state.timerActive ?
                                    //     <IonRow>
                                    //         <IonCol>
                                    //             <Timer
                                    //                 initialTime={0}
                                    //                 startImmediately={false}

                                    //             >
                                    //                 {
                                    //                     ({ start, resume, pause, stop, reset, timerState }) => (
                                    //                         <Fragment>
                                    //                             <Timer.Hours formatValue={value => value.toString().length === 1 ? `0${value}:` : `${value}:`} />
                                    //                             <Timer.Minutes formatValue={value => value.toString().length === 1 ? `0${value}:` : `${value}:`} />
                                    //                             <Timer.Seconds formatValue={value => value.toString().length === 1 ? `0${value}` : `${value}`} />
                                    //                         </Fragment>
                                    //                     )
                                    //                 }
                                    //             </Timer>
                                    //         </IonCol>
                                    //         <IonCol>

                                    //         </IonCol>
                                    //     </IonRow>
                                    //     :
                                    //     <IonRow>
                                    //         <IonCol><IonButton onClick={this.handleStartTimer} fill={null} expand="block" style={{ width: '40px !important' }}><IonIcon color="primary" style={{ fontSize: '32px' }} icon={timeOutline}></IonIcon></IonButton></IonCol>
                                    //         <IonCol><IonButton onClick={this.handleStartTimer} fill={null} expand="block" style={{ width: '35px !important' }}><IonIcon color="primary" style={{ fontSize: '28px' }} icon={clipboardOutline}></IonIcon></IonButton></IonCol>
                                    //         <IonCol><IonButton> Finalizar</IonButton></IonCol>
                                    //     </IonRow>
                                }

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataTitle">Supervisor</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataField">{'supervisor' in currentWorkOrder ? currentWorkOrder.supervisor : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataTitle">Planta</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel className="dataField">{'siteid' in currentWorkOrder ? currentWorkOrder.location : '-'}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                {
                    safetyDetails && (
                        <div>
                            <IonItem lines="full">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonLabel className="dataTitle">Riesgos</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    {
                                        safetyDetails.map((hazard, i) => (
                                            <IonRow key={i}>
                                                <IonCol>
                                                    <IonLabel className="dataField">{hazard.hazardId} - {hazard.hazardDescription}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        ))
                                    }
                                </IonGrid>
                            </IonItem>
                            <IonItem lines="full">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonLabel className="dataTitle">Precauciones</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    {
                                        safetyDetails.map((hazard, i) => (
                                            <IonRow key={i}>
                                                <IonCol>
                                                    <IonLabel className="dataField">{hazard.precautionId} - {hazard.precautionDescription}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        ))
                                    }
                                </IonGrid>
                            </IonItem>
                        </div>
                    )
                }
                


                <IonAlert
                    isOpen={this.state.showCompleteWOVerification2}
                    header={'Verificación'}
                    inputs={[
                        {
                            name: 'checkbox1',
                            value: 'true',
                            type: 'checkbox',
                            label: 'Área del activo limpia y ordenada. Se realizó inspección visual (de arriba abajo) del área intervenida, se ha eliminado material residual externo al activo (lubricantes, metálicos, plásticos, etc.).',
                            checked: false,
                            className: 'first-input'
                        },
                        {
                            name: 'checkbox2',
                            value: 'true',
                            type: 'checkbox',
                            label: 'Las guardas/barreras de seguridad han sido ubicadas en su lugar.',
                            checked: false,
                        },
                        {
                            name: 'checkbox3',
                            value: 'true',
                            type: 'checkbox',
                            label: 'Se han removido todas las refacciones herramientas, materiales externos, paños de limpieza y todo el material utilizado.',
                            checked: false,
                        },
                        {
                            name: 'checkbox4',
                            value: 'true',
                            type: 'checkbox',
                            label: 'En caso de que se requiera saneamiento y limpieza, el supervisor de seguridad alimenticia fue notificado.',
                            checked: false,
                        },
                        {
                            name: 'supervisor',
                            type: 'text',
                            placeholder: 'Supervisor',
                            label: 'test'
                        }
                    ]}
                    buttons={[
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: () => {
                                this.setState({ showCompleteWOVerification: false })
                            }
                        },
                        {
                            text: 'Enviar',

                            handler: (data) => {
                                this.handleHazardVerificationClick(data)
                            }
                        }
                    ]}
                />

                <IonToast
                    isOpen={this.state.showToast}
                    message={this.state.serverMsg}
                    position="bottom"
                    color={this.state.serverStatus === 'OK' ? 'success' : 'danger'}
                    duration={5000}
                    onDidDismiss={() => this.setState({ showToast: false })}
                />

            </IonContent>

        );
    }
};

function mapStateToProps({ auth, workOrders, localWorkOrders }) {
    return {
        token: auth.token,
        localWorkOrders
    }
}

export default connect(mapStateToProps)(WoDetails)
