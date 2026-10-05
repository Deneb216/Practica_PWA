const CACHE_NAME = "coffee-pwa-v6";

const assets = [
  "./",
  "./index.html",
  "./detalles.html", 
  "./Css/style.css", // <--- C mayúscula
  "./Js/app.js",
  "./Images/coffee1.JPG", // <--- Mayúscula
  "./Images/coffee2.jpg", // <--- Minúsculas desde aquí...
  "./Images/coffee3.jpg",
  "./Images/coffee4.jpg",
  "./Images/coffee5.jpg",
  "./Images/coffee6.jpg",
  "./Images/coffee7.jpg",
  "./Images/coffee8.jpg",
  "./Images/coffee9.jpg",
  "./Images/coffee10.jpg"
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