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
    
    paymentMethods: [

  {
  type: "mobile",
  name: "M-Pesa",
  paymentNumber: "07XXXXXXXX",
  accountName: "SHALOM PRODUCTS",
  ussdCode: "*150*00#"
 },

  {
    type: "mobile",
    name: "Airtel Money",
    paymentNumber: "07XXXXXXXX",
    accountName: "SHALOM PRODUCTS"
  },

  {
    type: "mobile",
    name: "Mixx by Yas",
    paymentNumber: "07XXXXXXXX",
    accountName: "SHALOM PRODUCTS"
  },

  {
    type: "bank",
    name: "Bank Transfer",
    bankName: "YOUR BANK",
    accountName: "SHALOM PRODUCTS",
    accountNumber: "XXXXXXXXX"
  }

]
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

    const paymentMethods =
    companyData?.paymentMethods || [];

  if(paymentMethods.length === 0){

    paymentBox.innerHTML = `
      <div style="
        padding:25px;
        text-align:center;
        color:#aaa;
      ">
        Payment information is currently unavailable.
      </div>
    `;

    return;
  }

  paymentBox.innerHTML = `

<div style="
position:relative;
overflow:hidden;
padding:22px;
border-radius:22px;
background:
linear-gradient(135deg,#071a2b,#06111f 45%,#0b2638);
border:1px solid rgba(0,255,255,.5);
box-shadow:
0 0 25px rgba(0,255,255,.15),
inset 0 0 30px rgba(0,255,255,.04);
">

<!-- DIGITAL HEADER -->

<div style="
text-align:center;
margin-bottom:24px;
">

<div style="
font-size:26px;
font-weight:900;
letter-spacing:2px;
font-family:monospace;
color:#00ffff;
text-shadow:
0 0 8px rgba(0,255,255,.8),
0 0 20px rgba(0,255,255,.35);
">
DIGITAL PAYMENT CENTER
</div>

<div style="
margin-top:8px;
font-size:13px;
letter-spacing:1px;
color:#8ffcff;
font-family:monospace;
">
SECURE • FAST • SIMPLE
</div>

</div>


<!-- PAYMENT METHODS -->

<div style="
display:grid;
gap:16px;
">

${paymentMethods.map((method,index)=>`

<div style="
position:relative;
padding:18px;
border-radius:18px;

background:
linear-gradient(
135deg,
rgba(0,255,255,.10),
rgba(255,255,255,.03)
);

border:1px solid
${index % 4 === 0
? "rgba(0,255,255,.5)"
: index % 4 === 1
? "rgba(255,60,100,.5)"
: index % 4 === 2
? "rgba(255,215,0,.5)"
: "rgba(0,255,136,.5)"
};

box-shadow:
0 0 18px
${index % 4 === 0
? "rgba(0,255,255,.12)"
: index % 4 === 1
? "rgba(255,60,100,.12)"
: index % 4 === 2
? "rgba(255,215,0,.12)"
: "rgba(0,255,136,.12)"
};

">

<div style="
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:14px;
">

<div style="
font-size:20px;
font-weight:900;
color:#ffffff;
letter-spacing:1px;
font-family:monospace;
">
${method.name}
</div>

<div style="
font-size:11px;
font-weight:bold;
letter-spacing:1px;
color:#00ff88;
">
● AVAILABLE
</div>

</div>


${
method.type === "mobile"

? `

<div style="
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
PAYMENT NUMBER
</div>

<div style="
display:flex;
align-items:center;
gap:10px;
margin-top:6px;
">

<div style="
flex:1;
padding:12px;
border-radius:10px;
background:#020b13;
border:1px solid rgba(0,255,255,.3);
color:#00ffff;
font-size:20px;
font-weight:900;
font-family:monospace;
letter-spacing:2px;
">
${method.paymentNumber}
</div>

<button
type="button"
onclick="copyPaymentNumber('${method.paymentNumber}')"
style="
padding:12px 14px;
border:none;
border-radius:10px;
background:#00ffff;
color:#001014;
font-weight:900;
font-family:monospace;
cursor:pointer;
box-shadow:0 0 12px rgba(0,255,255,.3);
">
COPY
</button>

${
  method.appLink
  ? `
    <button
      type="button"
      onclick="openPaymentApp()"
      style="
        padding:12px 14px;
        border:none;
        border-radius:10px;
        background:#ff4d6d;
        color:#ffffff;
        font-weight:900;
        font-family:monospace;
        cursor:pointer;
        box-shadow:0 0 12px rgba(255,77,109,.35);
      ">
      OPEN APP
    </button>
  `
  : ""
}

${
  method.ussdCode
  ? `
    <button
      type="button"
      onclick="openUSSD('${method.ussdCode}')"
      style="
        padding:12px 14px;
        border:none;
        border-radius:10px;
        background:#00ff88;
        color:#001014;
        font-weight:900;
        font-family:monospace;
        cursor:pointer;
        box-shadow:0 0 12px rgba(0,255,136,.3);
      ">
      OPEN M-PESA
    </button>
  `
  : ""
}

</div>


<div style="
margin-top:14px;
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
ACCOUNT NAME
</div>

<div style="
margin-top:5px;
color:#ffffff;
font-size:16px;
font-weight:bold;
font-family:monospace;
">
${method.accountName}
</div>

`

: `

<div style="
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
BANK NAME
</div>

<div style="
margin-top:5px;
color:#ffffff;
font-size:16px;
font-weight:bold;
font-family:monospace;
">
${method.bankName}
</div>


<div style="
margin-top:14px;
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
ACCOUNT NUMBER
</div>

<div style="
display:flex;
align-items:center;
gap:10px;
margin-top:6px;
">

<div style="
flex:1;
padding:12px;
border-radius:10px;
background:#020b13;
border:1px solid rgba(0,255,255,.3);
color:#00ffff;
font-size:18px;
font-weight:900;
font-family:monospace;
letter-spacing:2px;
">
${method.accountNumber}
</div>

<button
type="button"
onclick="copyPaymentNumber('${method.accountNumber}')"
style="
padding:12px 14px;
border:none;
border-radius:10px;
background:#00ffff;
color:#001014;
font-weight:900;
font-family:monospace;
cursor:pointer;
">
COPY
</button>

</div>


<div style="
margin-top:14px;
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
ACCOUNT NAME
</div>

<div style="
margin-top:5px;
color:#ffffff;
font-size:16px;
font-weight:bold;
font-family:monospace;
">
${method.accountName}
</div>

`

}

</div>

`).join("")}

</div>

</div>

`;

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

function updateConfirmationDetails(){

  const box =
    document.getElementById("confirmationDetailsText");

  if(!box) return;

  const serviceType =
    getActiveServiceType();

  const details = {

    product: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(0,255,255,.08),rgba(255,215,0,.08));
        border:1px solid rgba(0,255,255,.25);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#00ffff;
          margin-bottom:8px;
        ">
          ORDER SUMMARY
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please review your product details and customer information before confirming your order.
        </div>
      </div>
    `,

    flight: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(0,150,255,.12),rgba(0,255,255,.08));
        border:1px solid rgba(0,200,255,.3);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#00ccff;
          margin-bottom:8px;
        ">
          FLIGHT BOOKING
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide your travel information and review your passenger details before confirmation.
        </div>
      </div>
    `,

    bus: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(255,140,0,.12),rgba(255,215,0,.08));
        border:1px solid rgba(255,165,0,.3);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#ffb000;
          margin-bottom:8px;
        ">
          BUS BOOKING
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide your travel route, date and passenger information before confirmation.
        </div>
      </div>
    `,

    tourism: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(0,255,136,.12),rgba(255,215,0,.08));
        border:1px solid rgba(0,255,136,.3);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#00ff88;
          margin-bottom:8px;
        ">
          TOURISM & SAFARI
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide your travel plans, number of travelers and special requests before confirmation.
        </div>
      </div>
    `,

    hotel: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(180,80,255,.12),rgba(255,215,0,.08));
        border:1px solid rgba(190,100,255,.3);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#c77dff;
          margin-bottom:8px;
        ">
          HOTEL BOOKING
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide your stay dates, number of guests and room requirements before confirmation.
        </div>
      </div>
    `,

    service: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(0,255,255,.08),rgba(255,255,255,.05));
        border:1px solid rgba(0,255,255,.25);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#00ffff;
          margin-bottom:8px;
        ">
          SERVICE REQUEST
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide the information required for your service request before confirmation.
        </div>
      </div>
    `

  };

  box.innerHTML =
    details[serviceType] ||
    details.service;

    }

function updateDynamicBookingFields(){

  const box =
    document.getElementById("dynamicBookingFields");

  if(!box) return;

  const serviceType =
    getActiveServiceType();

  /* =========================
     PRODUCT
  ========================= */

  if(serviceType === "product"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(0,255,255,.06),
          rgba(255,215,0,.06)
        );
        border:1px solid rgba(0,255,255,.25);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#00ffff;
          margin-bottom:12px;
        ">
          PRODUCT ORDER INFORMATION
        </div>

        <div style="
          font-size:13px;
          color:#aaa;
          line-height:1.6;
        ">
          Please provide the product or service you would like to order.
        </div>

      </div>

    `;

  }


  /* =========================
     FLIGHT
  ========================= */

  else if(serviceType === "flight"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(0,180,255,.08),
          rgba(0,255,255,.05)
        );
        border:1px solid rgba(0,200,255,.35);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#00ccff;
          margin-bottom:14px;
        ">
          FLIGHT TRAVEL DETAILS
        </div>

        <input
        id="bookingDeparture"
        placeholder="Departure City / Airport"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingDestination"
        placeholder="Destination City / Airport"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingTravelDate"
        type="date"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingPassengers"
        type="number"
        min="1"
        placeholder="Number of Passengers"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <select
        id="bookingTravelClass"
        style="
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

          <option value="">
            Select Travel Class
          </option>

          <option value="Economy">
            Economy
          </option>

          <option value="Premium Economy">
            Premium Economy
          </option>

          <option value="Business">
            Business
          </option>

          <option value="First Class">
            First Class
          </option>

        </select>

      </div>

    `;

  }


  /* =========================
     BUS
  ========================= */

  else if(serviceType === "bus"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(255,165,0,.08),
          rgba(255,215,0,.05)
        );
        border:1px solid rgba(255,165,0,.35);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#ffb000;
          margin-bottom:14px;
        ">
          BUS TRAVEL DETAILS
        </div>

        <input
        id="bookingDeparture"
        placeholder="Departure / From"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingDestination"
        placeholder="Destination / To"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingTravelDate"
        type="date"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingPassengers"
        type="number"
        min="1"
        placeholder="Number of Passengers"
        style="
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

      </div>

    `;

  }


  /* =========================
     TOURISM / SAFARI
  ========================= */

  else if(serviceType === "tourism"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(0,255,136,.08),
          rgba(255,215,0,.05)
        );
        border:1px solid rgba(0,255,136,.35);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#00ff88;
          margin-bottom:14px;
        ">
          SAFARI & TOURISM DETAILS
        </div>

        <input
        id="bookingDestination"
        placeholder="Safari / Tour Destination"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingTravelDate"
        type="date"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingPassengers"
        type="number"
        min="1"
        placeholder="Total Number of Travelers"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingAdults"
        type="number"
        min="0"
        placeholder="Number of Adults"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingChildren"
        type="number"
        min="0"
        placeholder="Number of Children"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <select
        id="bookingHotel"
        style="
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

          <option value="">
            Hotel Accommodation Required?
          </option>

          <option value="Yes">
            Yes
          </option>

          <option value="No">
            No
          </option>

        </select>

      </div>

    `;

  }


  /* =========================
     HOTEL
  ========================= */

  else if(serviceType === "hotel"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(190,100,255,.08),
          rgba(255,215,0,.05)
        );
        border:1px solid rgba(190,100,255,.35);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#c77dff;
          margin-bottom:14px;
        ">
          HOTEL BOOKING DETAILS
        </div>

        <input
        id="bookingCheckIn"
        type="date"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingCheckOut"
        type="date"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingGuests"
        type="number"
        min="1"
        placeholder="Number of Guests"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingRooms"
        type="number"
        min="1"
        placeholder="Number of Rooms"
        style="
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

      </div>

    `;

  }


  /* =========================
     GENERAL SERVICE
  ========================= */

  else{

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(0,255,255,.06),
          rgba(255,255,255,.04)
        );
        border:1px solid rgba(0,255,255,.25);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#00ffff;
          margin-bottom:14px;
        ">
          SERVICE REQUEST DETAILS
        </div>

        <input
        id="bookingServiceDate"
        type="date"
        style="
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

      </div>

    `;

  }

}

function copyPaymentNumber(number){

  navigator.clipboard.writeText(number)
  .then(()=>{

    alert("Payment number copied successfully.");

  })
  .catch(()=>{

    alert("Unable to copy. Please copy the number manually.");

  });

}

function openUSSD(code){

  const ussdLink =
    "tel:" + encodeURIComponent(code);

  window.location.href = ussdLink;

}

function openPaymentApp(appLink){

  // Try to open M-Pesa directly
  const mpesaIntent =
    "intent://#Intent;scheme=mpesa;package=com.vodafone.mpesa.tanzania;end";

  window.location.href = mpesaIntent;

  // If M-Pesa does not open, show installation message
  setTimeout(() => {

    alert(
      "M-Pesa Tanzania app is not installed or could not be opened.\n\n" +
      "Please install the official M-Pesa Tanzania app first, then try again."
    );

  }, 2500);

}
