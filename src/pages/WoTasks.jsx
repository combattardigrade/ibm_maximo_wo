import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonButton } from '@ionic/react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import WoDetailsHeader from '../components/WODetailsHeader';
import { updateTaskStatus } from '../utils/api'
import { saveCurrentWorkOrder } from '../actions/workOrders'
import TaskDescModal from './TaskDescModal'
import './Page.css';
import './Maximo.css'
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class WoTasks extends Component {

    state = {
        showTaskDescModal: false,
        taskLongDescription: ''
    }

    handleCompleteTaskClick = (taskHref) => {
        const { currentWorkOrder, dispatch, token } = this.props
        if (!currentWorkOrder || !('href' in currentWorkOrder) || !taskHref) {
            console.log('error completing task')
            this.showAlert('Ocurrió un error al  intentar completar la tarea')
            return
        }

        updateTaskStatus({ woHref: currentWorkOrder.href, taskHref: taskHref, status: 'COMP', token: token })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                if (response.status == 'OK') {
                    
                    dispatch(saveCurrentWorkOrder({
                        ...currentWorkOrder,
                        woactivity: currentWorkOrder.woactivity.map((task) => {
                            if (task.href == taskHref) {
                                task.status = 'COMP'
                            }
                            return task
                        })
                    }))
                }
            })
            .catch((err) => {
                console.log(err)
                this.showAlert('Ocurrió un error al  intentar completar la tarea')
                return
            })
    }

    showAlert(message) {
        Modals.alert({
            title: 'Error',
            message,
        })
    }

    handleToggleTaskDescModal = (value) => {
        this.setState({ showTaskDescModal: value })
    }

    render() {
        const { currentWorkOrder } = this.props


        if (!currentWorkOrder) {
            return (<div>Loading...</div>)
        }


        return (
            <IonContent>

                <WoDetailsHeader currentWorkOrder={currentWorkOrder} />
                <IonItem>
                    <IonLabel className="dataTitle">Tareas:</IonLabel>
                </IonItem>
                {
                    currentWorkOrder && 'woactivity' in currentWorkOrder 
                        ?
                        currentWorkOrder.woactivity.sort((t1, t2) => parseInt(t1.taskid) - parseInt(t2.taskid)).map(task => (
                            <IonItem lines="full" key={task.taskid} button detail onClick={e => {e.preventDefault(); this.setState({taskLongDescription:task.description_longdescription,showTaskDescModal:true})}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2" style={{ textAlign: 'center' }}>
                                            {
                                                task.status != 'COMP'
                                                    ?
                                                    <IonButton onClick={e => { e.preventDefault(); this.handleCompleteTaskClick(task.href) }} fill="clear" style={{ height: '100%', width: '100%' }}><IonIcon style={{ fontSize: '28px', }} icon={closeOutline}></IonIcon></IonButton>
                                                    :
                                                    <IonIcon style={{ fontSize: '28px', paddingTop: '10px' }} icon={checkmarkOutline}></IonIcon>
                                            }

                                        </IonCol>
                                        <IonCol size="3" >
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
                        <IonItem><IonLabel className="dataField">No se encontraron resultados</IonLabel></IonItem>
                }
                <TaskDescModal handleToggleTaskDescModal={this.handleToggleTaskDescModal} showTaskDescModal={this.state.showTaskDescModal} taskLongDescription={this.state.taskLongDescription} />
            </IonContent>
        );
    }
};

function mapStateToProps({ auth, workOrders }) {
    return {
        token: auth.token,
        // currentWorkOrder: workOrders.currentWorkOrder

    }
}

export default connect(mapStateToProps)(WoTasks)
