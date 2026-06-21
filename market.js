const marketAds = [

{
  company: "deka",
  phone: "+255742097868",
  whatsapp: "255742097868",
  location: "Arusha, Tanzania",

  categories: ["Technology", "Services"],

  expiresAt: "2026-06-21 20:59",  

  images: [
    "images/logo.png",
    "images/logo1.jpg",
    "images/logo2.jpg"
  ]
},

{
  company: "AFRIVIBE PRINTS|EVENTS",
  phone: "+255746644223",
  whatsapp: "255752434777",
  location: "Dodoma, Tanzania",

  categories: ["Printing", "Events"],

  expiresAt: "2026-06-25 23:59",

  images: [
    "images/o1.png",
    "images/o2.jpg"
  ]
},

{
  company: "Yeriko Home Of Arts",
  phone: "255767178000",
  whatsapp: "255767178000",
  location: "Arusha, Tanzania",

  categories: ["Arts",],

  expiresAt: "2026-06-22 22:42",

  images: [
    "images/y1.png",
    "images/y2.jpg"
  ]
}

];

let selectedCategory = "All";

const marketCategories = [
  "All",
  "Technology",
  "Food",
  "Fashion",
  "Health",
  "Education",
  "Transport",
  "Tourism",
  "Arts",
  "Printing",
  "Events",
  "Services"
];

function renderMarket() {

  const container = document.getElementById("marketAds");
  if (!container) return;

  const categoryBox = document.getElementById("marketCategories");

if (categoryBox) {

  categoryBox.innerHTML = "";

  marketCategories.forEach(category => {

    categoryBox.innerHTML += `
      <button
        onclick="selectCategory('${category}')"
        style="
          background:#111;
          color:#00ffff;
          border:1px solid #00ffff;
          border-radius:20px;
          padding:8px 15px;
          cursor:pointer;
          white-space:nowrap;
        "
      >
        ${category}
      </button>
    `;

  });

}

  const search =
    document.getElementById("marketSearch")?.value.toLowerCase() || "";

  container.innerHTML = "";

  const now = new Date();

const filtered = marketAds.filter(company => {

  // Remove expired ads
  if (
    company.expiresAt &&
    new Date(company.expiresAt) <= now
  ) {
    return false;
  }

  // Category filter
  if (
    selectedCategory !== "All" &&
    (!company.categories ||
     !company.categories.includes(selectedCategory))
  ) {
    return false;
  }

  // Search filter
  return (
    (company.company || "").toLowerCase().includes(search) ||
    (company.location || "").toLowerCase().includes(search) ||
    (company.phone || "").toLowerCase().includes(search) ||
    (company.whatsapp || "").toLowerCase().includes(search)
  );

});

  filtered.forEach((company, index) => {

    const imagesSafe = encodeURIComponent(JSON.stringify(company.images || []));

    container.innerHTML += `
      <div class="marketCard" id="company-${index}" style="
        background:#111;
        border:1px solid #00ffff;
        border-radius:15px;
        padding:15px;
        margin-bottom:20px;
      ">

        <img
          class="marketBillboard"
          src="${company.images?.[0] || ''}"
          data-images="${imagesSafe}"
          data-index="0"
          style="
            width:100%;
            border-radius:10px;
            opacity:1;
            transition: opacity 1.2s ease-in-out;
          "
        >

        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          align-items:center;
          margin-top:10px;
          font-size:16px;
        ">

          <span style="color:#00ffff;font-weight:bold;">
            ${company.company}
          </span>

          <span style="color:#aaa;">
            ${company.location}
          </span>

          <a href="tel:${company.phone}" style="color:#00ffff;text-decoration:none;">
            Call
          </a>

          <a href="https://wa.me/${company.whatsapp}" target="_blank" style="color:#00ff88;text-decoration:none;">
            WhatsApp
          </a>

        </div>

      </div>
    `;

  });

  // IMPORTANT: restart billboard AFTER render
  setTimeout(() => {
    startMarketBillboard();
  }, 100);

}

function selectCategory(category) {

  selectedCategory = category;

  renderMarket();

}

let marketStarted = false;

function startMarketRotations() {

  if (marketStarted) return;
  marketStarted = true;

  marketAds.forEach((company, index) => {

    let i = 0;

    const img = document.getElementById(`billboard-${index}`);
    if (!img) return;

    setInterval(() => {

      // START FADE OUT + ZOOM OUT
      img.style.opacity = "0";
      img.style.transform = "scale(1)";

      setTimeout(() => {

        // change image
        i = (i + 1) % company.images.length;
        img.src = company.images[i];

        // force reflow (important for smooth transition)
        void img.offsetWidth;

        // FADE IN + SLOW ZOOM IN (premium effect)
        img.style.opacity = "1";
        img.style.transform = "scale(1)";

      }, 1200); // fade-out duration

    }, 7000); // total cycle per image

  });
}
