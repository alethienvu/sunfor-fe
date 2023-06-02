import { baseUrl } from 'core/constants';
import { urlB64ToUint8Array } from './utils';

const setup = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register(
      import.meta.env.MODE === 'production' ? 'src/service-worker.js' : 'src/dev-sw.js'
    );
    const result = await Notification.requestPermission();
    if (result === 'denied') {
      console.error('The user explicitly denied the permission request.');
      return;
    }
    if (result === 'granted') {
      console.info('The user accepted the permission request.');
    }
    const registrations = await navigator.serviceWorker.getRegistrations();
    const registration = registrations[0];
    if (registration) {
      const subscribed = await registration.pushManager.getSubscription();
      if (subscribed) {
        console.log('🚀🚀🚀 ~ User is already subscribed...');
        return;
      }

      const _subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(import.meta.env.VITE_WEB_PUSH_PUBLIC)
      });
      if (_subscription) {
        try {
          fetch(`${baseUrl}/notifications/add-subscription`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(_subscription)
          }).then(() => {
            console.log(`Add subcription success...`);
          });
        } catch (error) {
          console.log(`Add subcription fail...`);
        }
      }
    }
  }
};
export default setup;
