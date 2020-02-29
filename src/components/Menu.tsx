import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
  IonCol,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, personCircleOutline } from 'ionicons/icons';
import './Menu.css';

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonRow>
            <IonCol size="2"><IonIcon style={{ fontSize: '50px' }} icon={personCircleOutline} /></IonCol>
            <IonCol size="8"><IonListHeader style={{ paddingTop: '10px' }}>David Ignacio</IonListHeader></IonCol>

          </IonRow>





        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Menú</IonListHeader>

          <IonItem lines="none" >
            
            <IonLabel>Reporte de trabajo realizado</IonLabel>
          </IonItem>

          <IonItem lines="none" >
            
            <IonLabel>Reporte de trabajo a programar</IonLabel>
          </IonItem>

          <IonItem lines="none" >
            
            <IonLabel>Búsqueda de Órdenes</IonLabel>
          </IonItem>

          <IonItem lines="none" >
            
            <IonLabel>Inventario</IonLabel>
          </IonItem>

          <IonItem lines="none" >
            
            <IonLabel>Activos</IonLabel>
          </IonItem>

        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
