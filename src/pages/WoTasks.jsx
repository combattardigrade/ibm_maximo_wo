import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import WoDetailsHeader from '../components/WODetailsHeader';
import './Page.css';
import './Maximo.css'


class WoTasks extends Component {


    render() {
        const { currentWorkOrder, asset, jobPlan } = this.props


        if (!currentWorkOrder) {
            return (<div>Loading...</div>)
        }


        return (
            <IonContent>

                <WoDetailsHeader currentWorkOrder={currentWorkOrder} />

                {
                    currentWorkOrder && 'woactivity' in currentWorkOrder
                        ?
                        currentWorkOrder.woactivity.sort((t1, t2) => parseInt(t1.taskid) - parseInt(t2.taskid)).map(task => (
                            <IonItem lines="full" key={task.taskid} button detail>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2" style={{textAlign:'center'}}>
                                            <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={checkmarkOutline}></IonIcon>
                                        </IonCol>
                                        <IonCol size="3">
                                            <IonLabel className="dataSubtitle">Tarea: </IonLabel>
                                            <IonLabel className="dataSubtitle">Descripción: </IonLabel>
                                            <IonLabel className="dataSubtitle">Estado: </IonLabel>
                                        </IonCol>
                                        <IonCol>
                                            <IonLabel className="dataField">{'taskid' in task ? task.taskid : '-'}</IonLabel>
                                            <IonLabel className="dataField">{'description' in task ? task.description : '-'}</IonLabel>
                                            <IonLabel className="dataField">{'status' in task ? task.status : '-'}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        ))
                        :
                        <IonItem><IonLabel>No se encontraron resultados</IonLabel></IonItem>
                }

            </IonContent>
        );
    }
};

function mapStateToProps({ auth, workOrders }) {
    return {
        token: auth.token,


    }
}

export default connect(mapStateToProps)(WoTasks)
