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

  // Hide Booking Details
  document.getElementById("bookingDetailsCard").style.display = "none";

  // Show Payment Section
  document.getElementById("paymentContent").style.display = "block";

  // Find the active company's data
  const companyData =
    serviceDatabase[activeService?.company];

  // Find the Payment Details container
  const paymentBox =
    document.getElementById("paymentDetailsText");

  // Safety check
  if(!paymentBox) return;

  // Load the company's payment information
  paymentBox.innerHTML =
    companyData?.paymentDetails ||
    "Payment information is currently unavailable.";

}
