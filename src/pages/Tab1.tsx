import {
    IonContent,
    IonHeader,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    RefresherEventDetail
} from '@ionic/react';
import './Tab1.css';
import {useCallback, useState} from "react";
import { ReactComponent as TestIcon } from '../test-icon.svg';

const Tab1: React.FC = () => {
    const [isRemounting, setIsRemounting] = useState(false);

    const remountOccTimeout = useCallback(() => {
        setIsRemounting(true);
        window.setTimeout(() => {
            setIsRemounting(false);
        }, 100);
    }, []);

    const handleOnIonRefresh = useCallback(
        (event: CustomEvent<RefresherEventDetail>) => {
            window.setTimeout(() => {
                event.detail.complete();
                remountOccTimeout();
            }, 1000);
        },
        [remountOccTimeout]
    );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={handleOnIonRefresh}>
              <IonRefresherContent />
          </IonRefresher>
          {isRemounting ? null : <TestIcon />}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
