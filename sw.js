
// Holly Echo - AFYA LEVEL OFFLINE SERVICE WORKER

const CACHE_NAME = "holly-echo-v154";

/* =========================
   APP SHELL
========================= */

const APP_SHELL = [

  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./bg.js",
  "./library.js",
  "./offline.html",

  "./com.mp4",

  /* ICONS */
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",

  /* BACKGROUND IMAGES */
  "./images/1b.jpg",
  "./images/1c.jpg",
  "./images/1d.jpg",
  "./images/1e.jpg",
  "./images/1f.jpg",
  "./images/1g.jpg",
  "./images/1h.jpg",
  "./images/1i.jpg",
  "./images/2a.jpg",
  "./images/2b.jpg",

  /* BOOK COVERS */
  "./images/co1.jpg",
  "./images/co2.jpg",

  /* BOOK FILES */
  "./holly.pdf",
  "./learn.pdf",
  "./banner.txt"

];

/* =========================
   INSTALL EVENT (AFYA STYLE SAFE CACHE)
========================= */

self.addEventListener("install", (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {

      console.log("🔥 AFYA CACHE START");

      for (const file of APP_SHELL) {
        try {
          await cache.add(file);
          console.log("Cached:", file);
        } catch (err) {
          console.log("Skip failed file:", file);
        }
      }

      // 🔥 FORCE VIDEO DOUBLE CACHE (IMPORTANT)
      try {
        const video = await fetch("./com.mp4", { cache: "reload" });
        await cache.put("./com.mp4", video.clone());
        console.log("Video force-cached");
      } catch (e) {
        console.log("Video cache failed");
      }

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
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

/* =========================
   FETCH EVENT (AFYA LEVEL OFFLINE ENGINE)
========================= */

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;

  const url = event.request.url;

  event.respondWith(

    caches.match(event.request).then((cached) => {

      if (cached) return cached;

      return fetch(event.request).then((response) => {

        if (!response || response.status !== 200) {
          return response;
        }

        const clone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });

        return response;

      }).catch(() => {

        // OFFLINE FALLBACKS

        if (event.request.destination === "document") {
          return caches.match("./offline.html");
        }

        // VIDEO OFFLINE FIX (VERY IMPORTANT)
        if (
          event.request.destination === "video" ||
          url.endsWith(".mp4")
        ) {
          return caches.match("./com.mp4");
        }

      });

    })

  );
});
