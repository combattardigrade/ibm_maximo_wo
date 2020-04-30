import React from 'react'
import { IonGrid, IonRow, IonCol, Spinner } from '@ionic/react';
import ReactLoading from 'react-loading';

import '../pages/Maximo.css'

function Loading(props) {
    return (
        <IonGrid style={{height:'100%', width:'100%', background: '#005cff', position: 'absolute', zIndex:'2000'}}>
            <IonRow style={{ marginTop: '35vh', width: '100%' }}>
                <IonCol md={{ span: 8, offset: 2 }} style={{ textAlign: 'center' }}>
                    <ReactLoading className="preloader" type='bars' color='white' height={200} width={200} />
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default Loading