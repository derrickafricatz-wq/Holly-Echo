// Holly Echo - Offline Service Worker (FULL AFYA-STYLE VERSION)

const CACHE_NAME = "holly-echo-v2";

/* =========================
   APP SHELL (CORE FILES)
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

  /* BOOKS (PDF) */
  "./holly.pdf",
  "./learn.pdf",

  /* VIDEO */
  "./video/com.mp4",

  /* SCRIPTS */
  "./sponsors.js"
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

  self.skipWaiting();
});

/* =========================
   ACTIVATE EVENT
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

  self.clients.claim();
});

/* =========================
   FETCH STRATEGY (AFYA STYLE)
========================= */

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;

  const requestUrl = event.request.url;

  event.respondWith(
    caches.match(event.request).then((cached) => {

      /* 1. CACHE FIRST */
      if (cached) return cached;

      /* 2. NETWORK FALLBACK */
      return fetch(event.request).then((response) => {

        // ignore bad responses
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

        /* 3. OFFLINE PAGE */
        if (event.request.mode === "navigate") {
          return caches.match("./offline.html");
        }

        /* 4. PDF + VIDEO OFFLINE SUPPORT */
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
