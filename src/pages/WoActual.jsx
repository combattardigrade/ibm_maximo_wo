import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonTextarea } from '@ionic/react';
import { checkmarkOutline, closeOutline, addCircleOutline } from 'ionicons/icons'

import { RouteComponentProps } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

class WoActual extends Component {

    render() {
        const { match } = this.props

        return (
            <IonContent>
                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>00121</IonLabel></IonCol>
                            <IonCol><IonLabel>23/02/2020</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>MANTENIMIENTO EP HORNO</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>PAN CARGADOR MENSUAL</IonLabel>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonItem>

                <IonItem>
                    <IonLabel>"Mano de obra":</IonLabel>
                </IonItem>

                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="1">
                                <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={checkmarkOutline}></IonIcon>
                            </IonCol>
                            <IonCol>
                                <IonRow>
                                    <IonCol><IonLabel>DIGNIGRIO</IonLabel></IonCol>
                                    <IonCol><IonLabel>"Tarea:"20</IonLabel></IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel>"Duración:" 01_00</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonCol>

                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonItem lines="full">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="1">
                                <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={checkmarkOutline}></IonIcon>
                            </IonCol>
                            <IonCol>
                                <IonRow>
                                    <IonCol><IonLabel>DIGNIGRIO</IonLabel></IonCol>
                                    <IonCol><IonLabel>"Tarea:"20</IonLabel></IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel>"Duración:" 01_00</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonCol>

                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonItem>
                    <IonLabel>"Materiales":</IonLabel>
                </IonItem>

                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="1">
                                <IonIcon style={{ fontSize: '28px', paddingTop: '30px' }} icon={closeOutline}></IonIcon>
                            </IonCol>
                            <IonCol>
                                <IonRow> <IonNote>Rodameinto 630102Z Interior 2 Pulgada, exterior 3 Pulgada</IonNote></IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel>100-002-001</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel>"Cantidad:" 2</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonLabel>"Almacen:" ALMC_1062</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                
                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>"Comentarios":</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonTextarea
                                placeholder="Ingresar comentarios...">
                            </IonTextarea></IonCol>
                        </IonRow>
                    </IonGrid>

                </IonItem>
                <IonItem>
                    <IonGrid>                        
                        <IonRow>
                            <IonCol><IonTextarea
                                placeholder="Ingresar comentarios...">
                            </IonTextarea></IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel>"Adjuntos":</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol></IonCol>
                        </IonRow>
                    </IonGrid>

                </IonItem>

            </IonContent>

        );
    }
};

export default WoActual;
