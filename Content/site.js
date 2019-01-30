if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register('service-worker.js')
        .then(r => console.log("SW Registered"))
        .catch(console.error);
}