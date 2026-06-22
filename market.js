const marketAds = [

{
  company: "deka africa",
  phone: "+255742097868",
  whatsapp: "255742097868",
  location: "Arusha, Tanzania",

  categories: ["Technology", "Services"],

  expiresAt: "2026-07-22 00:59",  

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

  expiresAt: "2026-07-22 23:59",

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

  expiresAt: "2026-07-01 20:00",

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
