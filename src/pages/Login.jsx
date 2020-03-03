import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../utils/api'
import { saveToken } from '../actions/auth'

import { IonInput, IonContent, IonItem, IonLabel, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer'
import { save } from 'ionicons/icons'
import { Plugins } from '@capacitor/core'
const { Modals } = Plugins

class Login extends Component {

    

    componentDidMount() {
        console.log(this.props.history)
        
    }
    async showAlert(message) {
        let alertRet = await Modals.alert({
          title: 'Error',
          message,
        })
      }

    handleSubmit = async (e) => {
        e.preventDefault()
        
        const user = e.target.user.value
        const password = e.target.password.value
        
        if(!user || !password) {            
            this.showAlert('Ingresa todos los campos requeridos')           
            return
        }
        
        let response 
        try {
            response = await (await login({user: user, password: password})).json()
            console.log(response)
        }
        catch(err) {
            console.log(err)
            this.showAlert('Ocurrió un error al intentar realizar la acción. Por favor, inténtalo nuevamente.')   
            return
        }     

        if(response.status != 'OK') {
            this.showAlert('message' in response ? response.message : 'Ocurrió un error al intentar realizar la acción. Por favor, inténtalo nuevamente.')   
            return
        }        
        // save jwt
        this.props.dispatch(saveToken(response.payload))

        // redirect to dashboard
        this.props.history.replace('/dashboard')
    }

    

    render() {
        return (
            <IonPage>
                <ion-header translucent>
                    <ion-toolbar>
                        <ion-title>Iniciar Sesión</ion-title>
                    </ion-toolbar>
                </ion-header>

                <ion-content >
                    <form onSubmit={this.handleSubmit} style={{}}>
                        <ion-list  >
                            <ion-item>
                                <ion-label position="stacked">Usuario:<ion-text color="danger">*</ion-text></ion-label>
                                <ion-input  type="text" name="user"></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="stacked">Contraseña: <ion-text color="danger">*</ion-text></ion-label>
                                <ion-input  type="password" name="password"></ion-input>
                            </ion-item>

                            
                        </ion-list>

                        <div className="ion-padding">
                            <ion-button expand="block" type="submit" className="ion-no-margin">Iniciar sesión</ion-button>
                        </div>
                    </form>
                </ion-content>
                <ion-alert-controller></ion-alert-controller>
            </IonPage>
        )
    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapStateToProps)(Login)