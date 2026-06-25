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
  company: "Ruere Arts",
  phone: "255746727716",
  whatsapp: "255746727716",
  location: "Arusha, Tanzania|Rd 15.Kinana, Themi",

  categories: ["Arts",],

  expiresAt: "2026-07-25 18:00",

  images: [
    "images/1.png",
    "images/2.jpg",
    "images/3.jpg",
    "images/6.jpg",
    "images/8.jpg",
    "images/10.jpg",
    "images/11.jpg",
   "images/13.jpg",
   "images/15.jpg",
   "images/21.jpg",
   "images/23.jpg",
   "images/19.jpg",
   "images/21.jpg",
   "images/20.jpg",
   "images/24.jpg"   
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
