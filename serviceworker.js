const CACHE_NAME = "coffee-pwa-v8"; // Subimos versión

const assets = [
  "/Practica_PWA/",
  "/Practica_PWA/index.html",
  "/Practica_PWA/detalles.html", 
  "/Practica_PWA/Css/style.css",
  "/Practica_PWA/Js/app.js",
  "/Practica_PWA/manifest.json",
  "/Practica_PWA/Images/coffee1.JPG",
  "/Practica_PWA/Images/coffee2.jpg",
  "/Practica_PWA/Images/coffee3.jpg",
  "/Practica_PWA/Images/coffee4.jpg",
  "/Practica_PWA/Images/coffee5.jpg",
  "/Practica_PWA/Images/coffee6.jpg",
  "/Practica_PWA/Images/coffee7.jpg",
  "/Practica_PWA/Images/coffee8.jpg",
  "/Practica_PWA/Images/coffee9.jpg",
  "/Practica_PWA/Images/coffee10.jpg"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // En lugar de usar addAll() que rompe todo si falla 1 archivo,
      // agregamos uno por uno. Si falla uno, solo lo ignora y sigue.
      return Promise.all(
        assets.map(asset => {
          return cache.add(asset).catch(error => {
            console.error('Error cacheando el archivo:', asset, error);
          });
        })
      );
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request, { ignoreSearch: true }).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});