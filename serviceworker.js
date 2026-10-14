const CACHE_NAME = "coffee-pwa-v9"; // Versión actualizada

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
  "/Practica_PWA/Images/coffee10.jpg",
  "/Practica_PWA/Images/icons/icon-72x72.png",
  "/Practica_PWA/Images/icons/icon-96x96.png",
  "/Practica_PWA/Images/icons/icon-128x128.png",
  "/Practica_PWA/Images/icons/icon-144x144.png",
  "/Practica_PWA/Images/icons/icon-152x152.png",
  "/Practica_PWA/Images/icons/icon-192x192.png",
  "/Practica_PWA/Images/icons/Music-384x384.png",
  "/Practica_PWA/Images/icons/Music-512x512.png"
];

// INSTALACIÓN: Guarda los archivos en el caché inicial
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

// ACTIVACIÓN: Limpia los cachés viejos (v1, v2... v8) para no usar memoria extra
self.addEventListener("activate", activateEvent => {
  activateEvent.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// PETICIONES (FETCH): Estrategias Cache First y Network First
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
  // Se aplica a los documentos HTML (index.html, detalles.html, manifest)
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