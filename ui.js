function renderBooks() {
  const list = document.getElementById("bookList");

      const search =
document.getElementById("bookSearch")
?.value.toLowerCase() || "";

  list.innerHTML = "";

  books
.filter(book =>
book.title.toLowerCase().includes(search)
)
.forEach(book => {

    const item = document.createElement("div");

    item.style = `
  margin:15px;
  padding:15px;
  background:#111;
  border:1px solid #333;
  border-radius:12px;
  text-align:left;
`;

    item.innerHTML = `

<div style="
display:flex;
gap:14px;
align-items:flex-start;
">

<!-- BOOK COVER -->
<div style="flex-shrink:0;">

<img src="${book.cover}" style="
width:160px;
height:240px;
object-fit:cover;
border-radius:14px;
border:2px solid rgba(255,255,255,.10);
box-shadow:0 10px 22px rgba(0,0,0,.50);
transition:.3s;
cursor:pointer;
">

</div>

<!-- BOOK DETAILS -->
<div style="
flex:1;
display:flex;
flex-direction:column;
justify-content:space-between;
height:185px;
">

<div>

<div style="
font-size:25px;
font-weight:bold;
color:#fff;
line-height:1.2;
margin-bottom:10px;
">
${book.title}
</div>

<div style="
font-size:15px;
color:#ffc107;
margin-bottom:8px;
">
Author: ${book.author.author}
</div>

<div style="
display:inline-block;
padding:5px 12px;
border-radius:20px;
font-size:13px;
font-weight:bold;
background:${book.locked ? "rgba(255,68,68,.15)" : "rgba(0,255,136,.15)"};
color:${book.locked ? "#ff5555" : "#00ff88"};
border:1px solid ${book.locked ? "#ff5555" : "#00ff88"};
">
${book.locked ? "LOCKED" : "READY TO READ"}
</div>

</div>

<button onclick="openBook('${book.title}')" style="
margin-top:12px;
width:100%;
padding:13px;
border:none;
border-radius:10px;
font-size:18px;
font-weight:bold;
cursor:pointer;
background:${book.locked ? "linear-gradient(90deg,#ff3b3b,#ff6a6a)" : "linear-gradient(90deg,#00d9ff,#00ffff)"};
color:#fff;
box-shadow:0 4px 12px rgba(0,0,0,.35);
">
${book.locked ? "UNLOCK" : "READ NOW"}
</button>

</div>

</div>

<!-- PLANS -->
<div style="
margin-top:16px;
display:flex;
gap:10px;
">

<div style="
flex:1;
background:#141414;
border:1px solid #00eaff;
border-radius:12px;
padding:12px;
text-align:center;
">

<div style="color:#00ffff;font-weight:bold;font-size:16px;">
STARTER
</div>

<div style="
margin-top:8px;
font-size:22px;
font-weight:bold;
color:white;
">
${book.singlePurchase
  ? `<span style="text-decoration:line-through;color:#888;">TSH ${book.plans.starter.price.toLocaleString()}</span>`
  : `TSH ${book.plans.starter.price.toLocaleString()}`
}
</div>

<div style="
margin-top:5px;
font-size:13px;
color:#aaa;
">
${book.singlePurchase
  ? `<span style="color:#ff6666;font-weight:bold;">Not Available</span>`
  : `${book.plans.starter.pages} Pages`
}
</div>

</div>

<div style="
flex:1;
background:#141414;
border:1px solid #00eaff;
border-radius:12px;
padding:12px;
text-align:center;
">

<div style="color:#00ffff;font-weight:bold;font-size:16px;">
STANDARD
</div>

<div style="
margin-top:8px;
font-size:22px;
font-weight:bold;
color:white;
">
${book.singlePurchase
  ? `<span style="text-decoration:line-through;color:#888;">TSH ${book.plans.standard.price.toLocaleString()}</span>`
  : `TSH ${book.plans.standard.price.toLocaleString()}`
}
</div>

<div style="
margin-top:5px;
font-size:13px;
color:#aaa;
">
${book.singlePurchase
  ? `<span style="color:#ff6666;font-weight:bold;">Not Available</span>`
  : `${book.plans.standard.pages} Pages`
}
</div>

</div>

<div style="
flex:1;
background:#141414;
border:1px solid gold;
border-radius:12px;
padding:12px;
text-align:center;
">

<div style="
color:gold;
font-weight:bold;
font-size:16px;
">
PREMIUM
</div>

<div style="
margin-top:8px;
font-size:22px;
font-weight:bold;
color:gold;
">
${book.singlePurchase
  ? `<div style="color:#00ff88;font-size:14px;font-weight:bold;margin-bottom:5px;">✓ Only Available Option</div>
     <div>TSH ${book.plans.premium.price.toLocaleString()}</div>`
  : `TSH ${book.plans.premium.price.toLocaleString()}`
}
</div>

<div style="
margin-top:5px;
font-size:13px;
color:#aaa;
">
Unlimited Access
</div>

</div>

</div>

<div style="
margin-top:15px;
padding:15px;
border:1px solid #00ffff;
border-radius:12px;
background:rgba(0,255,255,0.08);
align-self:flex-start;
">

<div style="
background:#102428;
border:1px solid #00d9ff;
border-radius:14px;
padding:14px;
font-family:Arial,sans-serif;
">

<div style="
text-align:center;
font-size:20px;
font-weight:bold;
color:#00f7ff;
margin-bottom:2px;
">
SECURE PAYMENT
</div>

<div style="
text-align:center;
font-size:11px;
color:#8da4a8;
margin-bottom:12px;
">
Managed by
</div>

<div style="
text-align:center;
font-size:20px;
font-weight:bold;
color:#ffd700;
line-height:1.35;
margin-bottom:14px;
text-shadow:0 0 8px rgba(255,215,0,.35);
">
Trusted Payment Gateway
</div>

<div style="
background:#151515;
border-left:4px solid #00ff88;
border-radius:10px;
padding:10px 12px;
margin-bottom:10px;
">

<div style="
font-size:10px;
color:#888;
letter-spacing:1px;
">
BUSINESS NAME
</div>

<div style="
font-size:22px;
font-weight:bold;
color:#00ff88;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
">
DERRICK KIPAJI OF AFRIKA & CO
</div>

</div>

<div style="
background:#151515;
border-left:4px solid #ffd700;
border-radius:10px;
padding:10px 12px;
">

<div style="
font-size:10px;
color:#888;
letter-spacing:1px;
">
MERCHANT NUMBER
</div>

<div style="
font-size:22px;
font-weight:bold;
color:#ffd700;
white-space:nowrap;
">
140001788|PROV:AIRTEL|   23544652|PROV: HALOTEL|
</div>

</div>

</div>

<div style="
font-size:14px;
color:#aaa;
margin-top:12px;
line-height:1.5;
">
Instant access. Pay, confirm, and receive your license key.
</div>

<a
href="https://wa.me/255742097868?text=Hello%20Voice%20Of%20God,%0A%0AI%20have%20paid%20for%20the%20book:%20${encodeURIComponent(book.title)}%0A%0APayer%20Name:%20_____________%0A%0APlease%20verify%20my%20payment%20and%20send%20my%20license."
target="_blank"
style="
display:block;
margin-top:15px;
background:#25D366;
color:white;
text-align:center;
padding:14px;
border-radius:10px;
font-size:16px;
font-weight:bold;
text-decoration:none;
">
 VERIFY </a>


`;

    list.appendChild(item);
  });

  showRandomVerse();

    }

function showRandomVerse() {

  const verseBox = document.getElementById("dailyVerse");

  if (!verseBox) return;

  const randomVerse =
    bibleVerses[Math.floor(Math.random() * bibleVerses.length)];

  verseBox.innerHTML = `
    <div style="
      color:#00ffff;
      font-size:18px;
      font-weight:bold;
      margin-bottom:10px;
    ">
      🕊 Daily Encouragement
    </div>

    <div style="
      color:white;
      font-style:italic;
      margin-bottom:10px;
    ">
      "${randomVerse.verse}"
    </div>

    <div style="
      color:#aaa;
      font-size:14px;
    ">
      — ${randomVerse.reference}
    </div>
  `;

} 

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
  background:${selectedCategory === category ? '#00ffff' : '#111'};
  color:${selectedCategory === category ? '#000' : '#00ffff'};
  border:1px solid #00ffff;
  border-radius:20px;
  padding:10px 18px;
  font-weight:bold;

  box-shadow:
    0 4px 0 #008b8b,
    0 8px 15px rgba(0,255,255,.35);

  transition:all .2s ease;
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

          <button
           onclick="orderNow(${index})"
           style="
           background:#00ffff;
           color:black;
           border:none;
           border-radius:8px;
           padding:8px 15px;
           font-weight:bold;
           cursor:pointer;
           ">
           ORDER NOW
           </button>

        </div>

      </div>
    `;

  });

  // IMPORTANT: restart billboard AFTER render
  setTimeout(() => {
    startMarketBillboard();
  }, 100);

}

function orderNow(index) {

  selectedCompany = marketAds[index];

  if (!selectedCompany) return;

  document.getElementById("orderContent").innerHTML = `

<img
src="${selectedCompany.images[0]}"
style="
width:100%;
max-height:240px;
object-fit:cover;
border-radius:15px;
margin-bottom:20px;
">

<h2 style="
margin:0;
font-size:30px;
font-weight:900;
text-transform:uppercase;
letter-spacing:2px;
background:linear-gradient(45deg,#00ffff,#ffffff,#00aaff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
text-shadow:0 0 15px rgba(0,255,255,.4);
">
${selectedCompany.company}
</h2>

<p style="
color:#bbb;
font-size:16px;
margin-top:8px;
margin-bottom:20px;
">
${selectedCompany.location}
</p>

<input
id="customerName"
placeholder="Your Full Name"
style="
width:100%;
padding:14px;
margin-top:20px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<input
id="customerPhone"
placeholder="Phone Number"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<input
id="customerLocation"
placeholder="Delivery Location (Optional)"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<input
id="customerProduct"
placeholder="Product or Service (Optional)"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<input
id="customerQuantity"
placeholder="Quantity (Optional)"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<textarea
id="customerNote"
placeholder="Additional Notes (Optional)"
style="
width:100%;
height:120px;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
resize:none;
"></textarea>

<button
onclick="sendOrder()"
style="
width:100%;
margin-top:20px;
padding:18px;
font-size:20px;
font-weight:bold;
background:#00ffff;
color:black;
border:none;
border-radius:12px;
cursor:pointer;
">
SEND ORDER
</button>

`;

  document.getElementById("orderPage").style.display = "block";

}

function closeOrderPage(){

document.getElementById("orderPage").style.display="none";

}

function sendOrder(){

const name=document.getElementById("customerName").value.trim();
const phone=document.getElementById("customerPhone").value.trim();
const location=document.getElementById("customerLocation").value.trim();
const product=document.getElementById("customerProduct").value.trim();
const quantity=document.getElementById("customerQuantity").value.trim();
const note=document.getElementById("customerNote").value.trim();

if(name==="" || phone===""){

alert("Please complete the required information. Thank You.");

return;

}

const message =

`NEW ORDER

Company:
${selectedCompany.company}

Customer:
${name}

Phone:
${phone}

Delivery:
${location || "Not specified"}

Product:
${product || "Not specified"}

Quantity:
${quantity || "Not specified"}

Notes:
${note || "None"}

Sent from Voice of God App.`;

window.open(

`https://wa.me/${selectedCompany.whatsapp}?text=${encodeURIComponent(message)}`,

"_blank"

);

closeOrderPage();

}
