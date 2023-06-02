import dayjs from 'dayjs';
export const formatDate = (date: Date, format: string = 'hh:mm') => {
  return dayjs(date).format(format);
};

export const checkIsMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
export function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function linkify(text) {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return text.match(urlRegex);
}
