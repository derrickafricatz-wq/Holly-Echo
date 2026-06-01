// Holly Echo - Smart Offline Service Worker (FULL VERSION)

const CACHE_NAME = "holly-echo-v2";

/* =========================
   CORE APP SHELL (FIRST INSTALL)
========================= */

const APP_SHELL = [

  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./offline.html",

  /* ICONS */
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",

  /* BACKGROUND */
  "./bg.jpg",

  /* 📚 BOOKS (CRITICAL OFFLINE) */
  "./holly.pdf",
  "./learn.pdf",

  /* 🎥 VIDEO (CRITICAL OFFLINE) */
  "./video/com.mp4",

  /* JS FILES */
  "./sponsors.js"

];

/* =========================
   INSTALL - PRECACHE CORE
========================= */

self.addEventListener("install", (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {

      console.log("📦 Pre-caching Holly Echo files...");

      return cache.addAll(APP_SHELL);

    })
  );

  self.skipWaiting();
});

/* =========================
   ACTIVATE - CLEAN OLD CACHE
========================= */

self.addEventListener("activate", (event) => {

  event.waitUntil(
    caches.keys().then((keys) => {

      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );

    })
  );

  self.clients.claim();
});

/* =========================
   FETCH STRATEGY (AFYA STYLE SMART OFFLINE)
========================= */

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;

  const url = event.request.url;

  event.respondWith(
    caches.match(event.request).then((cached) => {

      // 1. Always serve cache first (FAST OFFLINE EXPERIENCE)
      if (cached) return cached;

      // 2. Try network
      return fetch(event.request)
        .then((response) => {

          // Ignore invalid responses
          if (!response || response.status !== 200) {
            return response;
          }

          // Save clone to cache
          const clone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });

          return response;

        })
        .catch(() => {

          // 3. Offline page fallback (ONLY for pages)
          if (event.request.mode === "navigate") {
            return caches.match("./offline.html");
          }

          // 4. PDF OFFLINE SAFETY
          if (url.includes(".pdf")) {
            return caches.match("./holly.pdf")
              || caches.match("./learn.pdf");
          }

          // 5. VIDEO OFFLINE SAFETY
          if (url.includes(".mp4")) {
            return caches.match("./video/com.mp4");
          }

        });

    })
  );

});
