const cacheName = "bday-card-v3.4"; // Verander de versie wanneer je iets wijzigt
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/script.js",
  "/assets/happy-birthday.mp3",
  "/assets/hind-frontpage.png"
];

// Cache de bestanden
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assets))
  );
});

// Verwijder oude caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            // Verwijder caches die niet overeenkomen met de huidige versie
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Dien bestanden op vanuit de cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
