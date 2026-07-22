let activeService = null;

const serviceDatabase = {

"SHALOM PRODUCTS": {

bannerMessages:[
"SHALOM PRODUCTS| Natural Products For A Better Life",
"Quality Agro Products Direct From Tanzania",
"Learn, Grow And Discover With Shalom Products"
]

}

};


let bannerIndex = 0;
let bannerTimer = null;

function loadServiceBanner(){

  const banner = document.getElementById("companyBanner");

  if(!banner) return;

  if(bannerTimer){
    clearInterval(bannerTimer);
  }

  const messages =
  activeService?.bannerMessages || [
    "Welcome to Digital Service Center",
    "Book Services Easily Inside Afri|Link",
    "Smart Business Connection Platform"
  ];


  bannerIndex = 0;

  banner.innerHTML = messages[bannerIndex];


  bannerTimer = setInterval(()=>{

    bannerIndex++;

    if(bannerIndex >= messages.length){
      bannerIndex = 0;
    }

    banner.style.opacity = "0";

    setTimeout(()=>{

      banner.innerHTML = messages[bannerIndex];

      banner.style.opacity = "1";

    },500);


  },4000);

}
