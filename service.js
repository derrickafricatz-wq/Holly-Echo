let activeService = null;

const serviceDatabase = {

  "SHALOM PRODUCTS": {

    serviceType: "product",

    bannerMessages: [
      "Welcome to SHALOM PRODUCTS",
      "Quality Agro Products Direct From Tanzania",
      "Natural Products For A Better Life"
    ],

    bookingDetails: `
      Product Category : Natural Food Products<br><br>
      Availability : In Stock<br><br>
      Order Type : Wholesale & Retail<br><br>
      Delivery : Tanzania Wide<br><br>
      Payment : Mobile Money & Bank Transfer
        `,
    
    paymentDetails:`
<div style="
text-align:left;
">

<div style="
font-size:18px;
font-weight:900;
color:#ffd700;
margin-bottom:12px;
">
AVAILABLE PAYMENT METHODS
</div>

<div style="
padding:14px;
margin-bottom:10px;
background:rgba(255,255,255,.05);
border:1px solid rgba(255,215,0,.3);
border-radius:12px;
">
<b>M-Pesa</b><br>
Payment Number: 07XXXXXXXX<br>
Account Name: SHALOM PRODUCTS
</div>

<div style="
padding:14px;
margin-bottom:10px;
background:rgba(255,255,255,.05);
border:1px solid rgba(255,215,0,.3);
border-radius:12px;
">
<b>Airtel Money</b><br>
Payment Number: 07XXXXXXXX<br>
Account Name: SHALOM PRODUCTS
</div>

<div style="
padding:14px;
margin-bottom:10px;
background:rgba(255,255,255,.05);
border:1px solid rgba(255,215,0,.3);
border-radius:12px;
">
<b>Mixx by Yas</b><br>
Payment Number: 07XXXXXXXX<br>
Account Name: SHALOM PRODUCTS
</div>

<div style="
padding:14px;
margin-bottom:10px;
background:rgba(255,255,255,.05);
border:1px solid rgba(255,215,0,.3);
border-radius:12px;
">
<b>Bank Transfer</b><br>
Bank Name: YOUR BANK<br>
Account Name: SHALOM PRODUCTS<br>
Account Number: XXXXXXXXX
</div>

</div>
`
  },

};


let bannerIndex = 0;
let bannerTimer = null;


// ===============================
// BOOKING DETAILS
// ===============================

function loadBookingDetails(){

  const box = document.getElementById("bookingDetailsText");

  if(!box) return;

  const companyData =
    serviceDatabase[activeService?.company];

  box.innerHTML =
    companyData?.bookingDetails ||
    "Booking information will appear here.";

}

function getActiveServiceType(){

  const companyData =
    serviceDatabase[activeService?.company];

  return companyData?.serviceType || "service";

}

function updateConfirmationTitle(){

  const title =
    document.getElementById("confirmationTitle");

  if(!title) return;

  const serviceType =
    getActiveServiceType();

  const titles = {

    product:
      "APPROVE YOUR ORDER",

    flight:
      "APPROVE YOUR FLIGHT",

    bus:
      "APPROVE YOUR BUS BOOKING",

    tourism:
      "APPROVE YOUR TOUR",

    hotel:
      "APPROVE YOUR HOTEL",

    service:
      "APPROVE YOUR SERVICE REQUEST"

  };

  title.innerHTML =
    titles[serviceType] ||
    "APPROVE YOUR BOOKING";

}


// ===============================
// COMPANY BANNER
// ===============================

function loadServiceBanner(){

  const banner =
    document.getElementById("companyBanner");

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

  banner.innerHTML =
    messages[bannerIndex];


  bannerTimer = setInterval(()=>{

    bannerIndex++;

    if(bannerIndex >= messages.length){
      bannerIndex = 0;
    }

    banner.style.opacity = "0";

    setTimeout(()=>{

      banner.innerHTML =
        messages[bannerIndex];

      banner.style.opacity = "1";

    },500);

  },5000);

}

function showPaymentTab(){

  // SHOW BOOKING TAB CONTENT
  document.getElementById("bookingDetailsCard").style.display = "none";

  // HIDE CONFIRMATION
  document.getElementById("confirmationContent").style.display = "none";

  // SHOW PAYMENT
  document.getElementById("paymentContent").style.display = "block";

  // LOAD COMPANY PAYMENT DETAILS
  const companyData =
    serviceDatabase[activeService?.company];

  const paymentBox =
    document.getElementById("paymentDetailsText");

  if(!paymentBox) return;

  paymentBox.innerHTML =
    companyData?.paymentDetails ||
    "Payment information is currently unavailable.";

}

function showConfirmationTab(){

  document.getElementById("bookingDetailsCard").style.display = "none";

  document.getElementById("paymentContent").style.display = "none";

  document.getElementById("confirmationContent").style.display = "block";

}

function showBookingTab(){

  // SHOW BOOKING DETAILS
  document.getElementById("bookingDetailsCard").style.display = "block";

  // HIDE PAYMENT
  document.getElementById("paymentContent").style.display = "none";

  // HIDE CONFIRMATION
  document.getElementById("confirmationContent").style.display = "none";

}
