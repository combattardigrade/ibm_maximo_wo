import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonGrid, IonRow,
    IonCol, IonIcon, IonSelect, IonSelectOption,
    IonModal, IonButton, IonInput, IonSpinner
} from '@ionic/react';
import {
    searchOutline
} from 'ionicons/icons'
import { getLaborCatalog } from '../utils/api'
import { saveLaborCatalog } from '../actions/labor'
class LaborModal extends Component {

    state = {
        searchMethod: 'personid',
        searchValue: '',
        loading: true
    }

    handleInputChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSelectChange = (e) => {
        this.setState({ searchMethod: e.target.value })
    }

    handleSearchClick = (e) => {
        e.preventDefault()
        const { searchMethod, searchValue } = this.state
        const { token, dispatch } = this.props
        this.setState({ loading: true, })

        if (!searchValue || !searchMethod) {
            getLaborCatalog({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {                        
                        dispatch(saveLaborCatalog(response.payload))
                        this.setState({loading: false})
                    }
                })
                .catch((err) => console.log(err))
            return
        }

        getLaborCatalog({ searchMethod: searchMethod, searchValue: searchValue, token: token })
            .then(data => data.json())
            .then((response) => {
                if (response.status == 'OK') {                    
                    dispatch(saveLaborCatalog(response.payload))
                    this.setState({loading: false})
                }
            })
            .catch((err) => console.log(err))

    }




    handleLaborClick = (_rowstamp) => {

    }

    componentDidMount() {
        const { token, labor, dispatch } = this.props

        if (!labor) {
            getLaborCatalog({ token: token })
                .then(data => data.json())
                .then((response) => {
                    if (response.status == 'OK') {
                        console.log(response.payload)
                        dispatch(saveLaborCatalog(response.payload))
                        this.setState({loading: false})
                    }
                })
                .catch((err) => console.log(err))
        } else {
            this.setState({ loading: false })
        }
    }

    render() {

        const { taskid, labor } = this.props
        const { loading } = this.state

        return (
            <IonModal isOpen={this.props.showLaborModal}>
                <IonHeader>
                    <IonToolbar>

                        <IonTitle>Mano de Obra</IonTitle>
                    </IonToolbar>

                    <IonToolbar>
                        <IonGrid style={{ borderBottom: '1px solid #dedede' }}>
                            <IonRow >
                                <IonCol style={{ paddingTop: '15px', fontWeight: 'bold' }}><IonLabel style={{ paddingLeft: '10px' }}>Buscar por:</IonLabel></IonCol>
                                <IonCol >
                                    <IonSelect onIonChange={this.handleSelectChange} style={{ maxWidth: '100% !important', width: '100% !important' }} interface="popover" value={this.state.searchMethod} placeholder="Selecciona método">
                                        <IonSelectOption value="personid">Código</IonSelectOption>
                                        <IonSelectOption value="displayname">Nombre</IonSelectOption>
                                    </IonSelect>
                                </IonCol>
                            </IonRow>
                            <IonRow >
                                <IonCol>
                                    <IonInput onIonChange={this.handleInputChange} value={this.state.searchValue} placeholder="Búsqueda de mano de obra"></IonInput>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={this.handleSearchClick} expand="block">Buscar</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    {
                        labor && loading == false
                            ?
                            labor.map((l) => (
                                <IonItem lines="full" key={l.laborid} button detail>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="6"><IonLabel>{l.personid}</IonLabel></IonCol>
                                            <IonCol size="6"><IonLabel>{l.person[0].displayname}</IonLabel></IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            ))
                            :
                            <div className="spinnerCenter">                                
                                    <IonSpinner name="crescent" style={{ textAlign: 'center' }} />                                
                            </div>
                    }
                </IonContent>
                <IonRow>
                    <IonCol><IonButton expand="full" color="light" onClick={() => this.props.handleToggleLaborModal(false)}>Cancelar</IonButton></IonCol>
                    <IonCol><IonButton expand="full" onClick={() => this.props.handleToggleLaborModal(false)}>Aceptar</IonButton></IonCol>
                </IonRow>
            </IonModal>
        )
    }
}

function mapStateToProps({ auth, labor }) {
    return {
        token: auth.token,
        labor: labor.laborCatalog

    }
}

export default connect(mapStateToProps)(LaborModal);