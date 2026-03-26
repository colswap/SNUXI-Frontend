import { getToken, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { registerDevice } from '../api/notification';
import { messaging } from '../firebase';

const VAPID_KEY =
  'BPc2H5k7GRL4JGx8VrJ5JZvdiNal6EHGvV2dxbK8-_BiytbcQu9CnlXGm2R3TMpAKph5gKv19_w6fIvtvjzu43Q';
const DEVICE_ID_KEY = 'snuxi_device_id';

function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

function detectBrowserType(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'FIREFOX';
  if (ua.includes('Edg')) return 'EDGE';
  if (ua.includes('OPR') || ua.includes('Opera')) return 'OPERA';
  if (ua.includes('SamsungBrowser')) return 'SAMSUNG';
  if (ua.includes('Chrome')) return 'CHROME';
  if (ua.includes('Safari')) return 'SAFARI';
  return 'OTHER';
}

async function setupPush() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (!token) return;

    const deviceId = getDeviceId();
    const browserType = detectBrowserType();
    await registerDevice(deviceId, token, browserType);

    onMessage(messaging, (payload) => {
      const { title, body } = payload.notification || {};
      new Notification(title || 'SNUXI', {
        body: body || '새로운 알림이 있습니다.',
        icon: '/snuxi-logo.png',
      });
    });
  } catch (error) {
    console.error('FCM setup failed:', error);
  }
}

export const usePushNotification = (isLoggedIn: boolean) => {
  useEffect(() => {
    if (!isLoggedIn) return;
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
    setupPush();
  }, [isLoggedIn]);
};
