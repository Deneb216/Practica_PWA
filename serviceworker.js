const CACHE_NAME = "coffee-pwa-v3"; // Subimos a v3

const assets = [
  "./",
  "./index.html",
  "./detalles.html", 
  "./css/style.css",
  "./Js/app.js",
  "./Images/coffee1.JPG",
  "./Images/coffee2.JPG",
  "./Images/coffee3.JPG",
  "./Images/coffee4.JPG",
  "./Images/coffee5.JPG",
  "./Images/coffee6.JPG",
  "./Images/coffee7.JPG",
  "./Images/coffee8.JPG",
  "./Images/coffee9.JPG",
  "./Images/coffee10.JPG"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});