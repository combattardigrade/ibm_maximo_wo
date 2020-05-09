import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonButton } from '@ionic/react';
import { checkmarkOutline, closeOutline, closeCircle, checkmarkCircle } from 'ionicons/icons'

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
                <IonItem lines="full" >
                    <IonLabel className="dataTitle">Tareas:</IonLabel>
                </IonItem>
                {
                    currentWorkOrder && 'woactivity' in currentWorkOrder
                        ?
                        currentWorkOrder.woactivity.sort((t1, t2) => parseInt(t1.taskid) - parseInt(t2.taskid)).map(task => (
                            <IonItem lines="full" key={task.taskid} button detail onClick={e => { e.preventDefault(); this.setState({ taskLongDescription: 'description_longdescription' in task ? task.description_longdescription : task.description, showTaskDescModal: true }) }}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="2" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            {
                                                task.status != 'COMP'
                                                    ?
                                                    <IonButton  style={{ height: '100%', width: '100%' }} onClick={e => { e.stopPropagation(); this.handleCompleteTaskClick(task.href) }} fill="clear" ><IonIcon style={{ fontSize: '24px', }} icon={closeCircle}></IonIcon></IonButton>
                                                    :
                                                    <IonButton onClick={e => { e.stopPropagation(); }}  fill="clear" color="dark"> <IonIcon style={{ fontSize: '24px' }} icon={checkmarkCircle}></IonIcon></IonButton>
                                            }

                                        </IonCol>
                                        <IonCol style={{paddingLeft:'20px'}}>
                                            <IonLabel className="dataField"><span className="dataSubtitle">Tarea:</span> {'taskid' in task ? task.taskid : '-'}</IonLabel>
                                            <IonLabel className="dataField"><span className="dataSubtitle">Descripción:</span> {'description' in task ? task.description.substring(0,30) : '-'}</IonLabel>
                                            <IonLabel className="dataField"><span className="dataSubtitle">Estado:</span> {'status' in task ? task.status : '-'}</IonLabel>
                                            
                                            
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
