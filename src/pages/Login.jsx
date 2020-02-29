import React, { Component } from 'react'
import { IonInput, IonContent, IonItem, IonLabel, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

class Login extends Component {
    render() {
        return (
            <IonPage>
                <ion-header translucent>
                    <ion-toolbar>
                        <ion-title>Iniciar Sesión</ion-title>
                    </ion-toolbar>
                </ion-header>

                <ion-content >
                    <form onsubmit="processForm(event)" style={{}}>
                        <ion-list  >
                            <ion-item>
                                <ion-label position="stacked">Usuario:<ion-text color="danger">*</ion-text></ion-label>
                                <ion-input required type="text" oninput="handleFirstNameValue(event)"></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="stacked">Contraseña: <ion-text color="danger">*</ion-text></ion-label>
                                <ion-input required type="password" oninput="handleLastNameValue(event)"></ion-input>
                            </ion-item>

                            
                        </ion-list>

                        <div class="ion-padding">
                            <ion-button expand="block" type="submit" class="ion-no-margin">Iniciar sesión</ion-button>
                        </div>
                    </form>
                </ion-content>
                <ion-alert-controller></ion-alert-controller>
            </IonPage>
        )
    }
}

export default Login