const cacheName = 'v1';


const cacheAssets = [

   '/index.html',
   '/style.css',
   '/main.js',
   'mamifest.json'

];




// call install  Event

self.addEventListener('install', (e) =>{

    console.log('Servicw Worker: Installed');

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache =>{
             console.log('Service Worker: Caching Files');
             cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});



//call Activate Event

self.addEventListener('activate', e => {

    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheName => {
            if(cache !== cacheName) {
                console.log('Service Worker: Clearing Old Cache');
                return caches.delete();
            }
        })
    )
});


// call Fetch Evevnt

self.addEventListener('fetch', e => {

    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
});