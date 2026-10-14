const CACHE_NAME = "coffee-pwa-v9"; // Subimos versión

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

// Asegúrate de subir la versión de tu caché en la primera línea del archivo
// const CACHE_NAME = "coffee-pwa-v7"; 

self.addEventListener("fetch", fetchEvent => {
  const request = fetchEvent.request;

  // 1. ESTRATEGIA CACHE FIRST (Caché primero, si no, Red)
  // Se aplica a imágenes, hojas de estilo (CSS) y scripts (JS)
  if (request.destination === 'image' || request.destination === 'style' || request.destination === 'script') {
    fetchEvent.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse; // Devuelve el archivo desde la caché
        }
        // Si no está en caché, lo busca en la red
        return fetch(request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return; // Termina la ejecución para este tipo de archivos
  }

  // 2. ESTRATEGIA NETWORK FIRST (Red primero, si falla, Caché)
  // Se aplica a los documentos HTML (index.html, detalles.html)
  fetchEvent.respondWith(
    fetch(request)
      .then(networkResponse => {
        // Si hay internet, guarda la versión más nueva en caché y la muestra
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Si no hay internet (falla la red), muestra la versión guardada en caché
        return caches.match(request);
      })
  );
});