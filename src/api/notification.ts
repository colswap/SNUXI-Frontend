import apiClient from './index';

export const registerDevice = (
  deviceId: string,
  fcmToken: string,
  browserType: string
) =>
  apiClient.post('/user/device', {
    token: fcmToken,
    deviceId,
    browserType,
  });
