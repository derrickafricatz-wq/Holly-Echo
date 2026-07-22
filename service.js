let activeService = null;

const serviceDatabase = {

"SHALOM PRODUCTS":{

  bannerMessages:[
    "Welcome to SHALOM PRODUCTS",
    "Quality Agro Products Direct From Tanzania",
    "Natural Products For A Better Life"
  ],

  bookingDetails:`
Product Category : Natural Food Products

Availability : In Stock

Order Type : Wholesale & Retail

Delivery : Tanzania Wide

Payment : Mobile Money & Bank Transfer
`

}

};


let bannerIndex = 0;
let bannerTimer = null;

function loadBookingDetails(){

  const box = document.getElementById("bookingDetailsText");

  if(!box) return;

  const companyData =
  serviceDatabase[activeService?.company];

  box.innerHTML =
  companyData?.bookingDetails ||
  "Booking information will appear here.";
  }

function loadServiceBanner(){

  const banner = document.getElementById("companyBanner");

  if(!banner) return;

  if(bannerTimer){
    clearInterval(bannerTimer);
  }


  const companyData =
  serviceDatabase[activeService?.company];


  const messages =
  companyData?.bannerMessages || [
    "Welcome to Digital Service Center",
    "Book Services Easily Inside AfriLink",
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


  },5000);

}

function showPaymentTab(){

  document.getElementById("bookingDetailsCard").style.display = "none";

  document.getElementById("paymentContent").style.display = "block";

}
