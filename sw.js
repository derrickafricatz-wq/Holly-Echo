const CACHE_NAME = "holly-echo-v11";

/* =========================
   CORE FILES (SAFE TO CACHE)
========================= */

const APP_FILES = [
  "/Holly-Echo/index.html",
  "/Holly-Echo/manifest.json",
  "/Holly-Echo/offline.html",

  "/Holly-Echo/sw.js",
  "/Holly-Echo/sponsors.js",

  "/Holly-Echo/icon-192.png",
  "/Holly-Echo/icon-512.png",
  "/Holly-Echo/icon-512-maskable.png",

  "/Holly-Echo/bg.jpg",
  "/Holly-Echo/holly.pdf",
  "/Holly-Echo/learn.pdf"
];

/* =========================
   INSTALL
========================= */

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("📦 Caching app shell...");

      try {
        await cache.addAll(APP_FILES);
      } catch (err) {
        console.log("⚠️ Cache addAll failed:", err);
      }
    })
  );

  self.skipWaiting();
});

/* =========================
   ACTIVATE
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
   FETCH (SMART STRATEGY)
========================= */

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = event.request.url;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // ❌ DO NOT CACHE THESE (important fix)
          const skipCache =
            url.includes("supabase") ||
            url.includes("google") ||
            url.includes("firebase") ||
            url.includes("blob:") ||
            url.includes("video");

          if (skipCache) {
            return response;
          }

          const clone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });

          return response;
        })
        .catch(() => {
          // =========================
          // OFFLINE FALLBACK LOGIC
          // =========================

          if (event.request.destination === "document") {
            return caches.match("/Holly-Echo/index.html")
              .then(res => res || caches.match("/Holly-Echo/offline.html"));
          }

          if (event.request.destination === "image") {
            return caches.match("/Holly-Echo/bg.jpg");
          }

          return new Response("Offline", { status: 503 });
        });
    })
  );
});
