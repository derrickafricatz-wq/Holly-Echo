const introAds = [
  "com.mp4",
];

let currentIndex = 0;

function playIntroAd(index) {

  // if no more ads → open app
  if (index >= introAds.length) {
    showApp();
    return;
  }

  // remove old ad if exists
  const old = document.getElementById("introAd");
  if (old) old.remove();

  // create ad container
  const ad = document.createElement("div");
  ad.id = "introAd";

  ad.style = `
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:black;
    z-index:9999999;
    display:flex;
    justify-content:center;
    align-items:center;
  `;

  // video element
  ad.innerHTML = `
    <video id="adVideo" autoplay muted playsinline
      style="width:100%;height:100%;object-fit:cover;">
      <source src="${introAds[index]}" type="video/mp4">
    </video>
  `;

  document.body.appendChild(ad);

  const video = document.getElementById("adVideo");

  // when video ends → next ad
  video.onended = () => {
    playIntroAd(index + 1);
  };

  // safety fallback (if video fails)
  video.onerror = () => {
    playIntroAd(index + 1);
  };
}

function showApp() {
  const bg = document.getElementById("appBg");

  if (bg) {
    bg.style.display = "block";
  }

  const intro = document.getElementById("introAd");
  if (intro) intro.remove();
}

// start intro when app loads
window.addEventListener("load", () => {
  playIntroAd(0);
});
