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
