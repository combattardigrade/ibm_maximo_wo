import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../utils/api'
import { saveToken } from '../actions/auth'

import {
    IonInput, IonContent, IonItem, IonLabel, IonGrid, IonMenuButton, IonPage, IonTitle, IonToolbar, IonAlert,
    IonRow, IonNote, IonCol, IonButton
} from '@ionic/react';

import { save } from 'ionicons/icons'
import logo from '../components/logo.png'


class Login extends Component {

    state = {
        user: '',
        password: '',
        showAlert: false,
        alertTitle: '',
        alertMsg: '',

    }

    componentDidMount() {
        try {
            if (this.props.location.state.logout === true) {
                const { state } = this.props.location
                const stateCopy = { ...state }
                delete stateCopy.logout
                this.props.history.replace({ state: stateCopy })
                setTimeout(() => {
                    window.location.reload()
                }, 100)
            }
        } catch (e) {
            console.log(e)
        }
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    handleUserChange = (e) => this.setState({ user: e.target.value })
    handlePasswordChange = (e) => this.setState({ password: e.target.value })

    handleSubmit = async (e) => {
        e.preventDefault()

        const { user, password } = this.state
        
        if (!user || !password) {
            this.showAlert('Ingresa todos los campos requeridos')
            return
        }

        let response
        try {
            response = await (await login({ user: user, password: password })).json()
            console.log(response)
        }
        catch (err) {
            console.log(err)
            this.showAlert('Ocurrió un error al intentar realizar la acción. Por favor, inténtalo nuevamente.')
            return
        }
        console.log(response)
        if (response.status != 'OK') {
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

                <IonContent color="dark">
                    <div className='authPage'>
                        <form onSubmit={this.handleSubmit} style={{ width: '100%' }} >
                            <div style={{ textAlign: 'center' }}>
                                <img src={logo} style={{ height: '8em' }} />

                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px' }}>
                                <IonLabel className='authTitle'>INICIAR SESIÓN</IonLabel>
                            </div>
                            <div style={{ padding: 15, paddingBottom: 5 }}>
                                <IonItem className="dark item-input-login" lines="full">
                                    <IonInput onChange={this.handleUserChange} className="input-login" type="text" placeholder="Usuario"></IonInput>
                                </IonItem>

                                <IonItem className="dark item-input-login" lines="full" style={{ marginTop: '15px' }}>
                                    <IonInput onChange={this.handlePasswordChange} className="input-login" type="password" placeholder="Contraseña" ></IonInput>
                                </IonItem>
                            </div>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" style={{ paddingBottom: '0px', paddingLeft: '8px', paddingRight: '8px' }}>
                                        <IonButton onClick={this.handleSubmit} color="light" expand="full" >Ingresar</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </form>
                        <div style={{ bottom: '20px', position: 'absolute' }}>
                            <IonNote onClick={e => { e.preventDefault(); this.goToPage('signup') }} style={{ fontSize: '0.8em', color: 'white' }}>Configuración de Conexión</IonNote>
                        </div>
                    </div>
                </IonContent>
                <IonAlert
                    isOpen={this.state.showAlert}
                    header={this.state.alertTitle}
                    message={this.state.alertMsg}
                    buttons={[{
                        text: 'OK',
                        handler: () => {
                            this.setState({ showAlert: false })
                        }
                    }]}
                />
            </IonPage>
        )
    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapStateToProps)(Login)