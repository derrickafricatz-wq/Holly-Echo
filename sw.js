// Holly Echo - Offline Service Worker (FINAL CLEAN VERSION)

const CACHE_NAME = "holly-echo-v84";

/* =========================
   FILES TO CACHE (APP SHELL)
========================= */

const APP_SHELL = [

  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./bg.js",
  "./library.js",
  "./offline.html",

  /* ICONS */
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",

  /* BACKGROUND */
   "./1b.jpg",
   "./1c.jpg",
   "./1d.jpg",
   "./1e.jpg",
   "./1f.jpg",
   "./1g.jpg",
   "./1h.jpg",
   "./1i.jpg",
   "./2a.jpg",
   "./2b.jpg",
   
  /* BOOKS (PDF) */
  "./holly.pdf",
  "./learn.pdf",
  "./banner.txt"

];

/* =========================
   INSTALL EVENT
========================= */

self.addEventListener("install", (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell...");
      return cache.addAll(APP_SHELL);
    })
  );

  // Force new SW to activate immediately
  self.skipWaiting();
});

/* =========================
   ACTIVATE EVENT (FIXED + IMPORTANT)
========================= */

self.addEventListener("activate", (event) => {

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  // ðŸ”¥ CRITICAL: take control immediately
  self.clients.claim();
});

/* =========================
   FETCH STRATEGY (AFYA STYLE OFFLINE)
========================= */

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;

  const requestUrl = event.request.url;

  // VIDEO FIX
  if (
    event.request.destination === "video" ||
    requestUrl.endsWith(".mp4")
  ) {

    event.respondWith(

      caches.match(event.request).then((response) => {

        if (response) {
          console.log("Video from cache:", requestUrl);
          return response;
        }

        return fetch(event.request);

      })

    );

    return;
  }

  event.respondWith(

    caches.match(event.request).then((cachedResponse) => {

      /* 1. CACHE FIRST (FAST OFFLINE LOAD) */
      if (cachedResponse) {
        return cachedResponse;
      }

      /* 2. NETWORK FALLBACK */
      return fetch(event.request).then((response) => {

        // ignore invalid responses
        if (
          !response ||
          response.status !== 200 ||
          response.type === "opaque"
        ) {
          return response;
        }

        const clone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });

        return response;

      }).catch(() => {

        /* 3. OFFLINE PAGE FOR NAVIGATION */
        if (event.request.mode === "navigate") {
          return caches.match("./offline.html");
        }

        /* 4. FORCE OFFLINE SUPPORT FOR PDF + VIDEO */
        if (
          requestUrl.includes(".pdf") ||
          requestUrl.includes(".mp4")
        ) {
          return caches.match(event.request);
        }

      });

    })

  );

});
