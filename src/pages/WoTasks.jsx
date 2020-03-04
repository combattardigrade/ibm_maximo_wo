import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon } from '@ionic/react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';



class WoTasks extends Component {    

    // async componentDidMount() {
    //     const { currentWorkOrder, dispatch, token } = this.props
    //     if ('jpnum' in currentWorkOrder) {
    //         console.log('fetching job plan')
    //         let response = await (await getJobPlan({ jpnum: currentWorkOrder.jpnum, token: token })).json()
    //         this.setState({ jobPlan: response.status == 'OK' ? response.payload : {} })
    //     }
    // }

    render() {
        const { currentWorkOrder, jobPlan } = this.props        

        
        if (!currentWorkOrder || !jobPlan) {
            return <div>Loading...</div>
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
                                <IonLabel>{currentWorkOrder.asset.description}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                {

                    jobPlan.jobtask.sort((t1, t2) => parseInt(t1.jptask) - parseInt(t2.jptask)).map(task => (
                        <IonItem lines="full" key={task.jobtaskid} button detail>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="1">
                                        <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={checkmarkOutline}></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        <IonRow> <IonLabel>Tarea: {task.jptask}</IonLabel></IonRow>
                                        <IonRow><IonCol size="12"><IonNote>{task.description}</IonNote></IonCol></IonRow>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    ))
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
