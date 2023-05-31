if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode...');
  // register the service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service worker registration failed:', error);
        });
    });
  }

  // listen for notifications from the service worker
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('Service worker sent a message:', event.data);
  });
} else {
  console.log('Running in development mode...');
}
