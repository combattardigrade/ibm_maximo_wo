import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';



class WoTasks extends Component {


    render() {
        const { currentWorkOrder, asset, jobPlan } = this.props


        if (!currentWorkOrder) {
            return (<div>Loading...</div>)
        }


        return (
            <IonContent>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>{currentWorkOrder.wonum}</IonLabel></IonCol>
                            <IonCol><IonLabel>{currentWorkOrder.targstartdate}</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{currentWorkOrder.description}</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{asset && asset.description}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                {
                    currentWorkOrder && 'woactivity' in currentWorkOrder 
                    ?
                        currentWorkOrder.woactivity.sort((t1, t2) => parseInt(t1.taskid) - parseInt(t2.taskid)).map(task => (
                            <IonItem lines="full" key={task.taskid} button detail>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="1">
                                            <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={checkmarkOutline}></IonIcon>
                                        </IonCol>
                                        <IonCol>
                                            <IonRow> <IonLabel>Tarea: {task.taskid}</IonLabel></IonRow>
                                            <IonRow><IonCol size="12"><IonNote>{task.description}</IonNote></IonCol></IonRow>
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
