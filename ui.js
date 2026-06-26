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
gap:15px;
align-items:flex-start;
">

  <img
  src="${book.cover}"
  style="
      width:110px;
      height:165px;
      object-fit:cover;
      border-radius:8px;
      box-shadow:0 4px 10px rgba(0,0,0,.5);
      flex-shrink:0;
  "
>

  <div style="flex:1;">

  <div style="
    font-weight:bold;
    font-size:22px;
    color:white;
  ">
    ${book.title}
  </div>

  <div style="
    color:#ffcc00;
    font-size:15px;
    margin-top:4px;
">
     Author: ${book.author.author}
</div>

  <div style="
    color:${book.locked ? "#ff5555" : "#00ff88"};
    font-size:15px;
    margin-top:6px;
  ">
    ${book.locked ? "Locked" : "Ready to Read"}
  </div>

  <button onclick="openBook('${book.title}')" style="
    margin-top:10px;
    padding:12px 20px;
    border:none;
    border-radius:8px;
    background:${book.locked ? "#ff4444" : "#00ffff"};
    font-weight:bold;
    font-size:20px;
  ">
    ${book.locked ? "UNLOCK" : "READ"}
  </button>

</div>
 
  <div style="
  margin-top:10px;
  border:1px solid #00ffff;
  border-radius:12px;
  padding:12px;
  background:rgba(0,255,255,0.05);
">

  <div style="color:#00ffff;font-size:20px;font-weight:bold;">
    STARTER
  </div>
  <div>
    TSH ${book.plans.starter.price.toLocaleString()}
    . ${book.plans.starter.pages} Pages
  </div>

  <hr>

  <div style="color:#00ffff;font-size:20px;font-weight:bold;">
    STANDARD
  </div>
  <div>
    TSH ${book.plans.standard.price.toLocaleString()}
    . ${book.plans.standard.pages} Pages
  </div>

  <hr>

  <div style="color:#00ffff;font-size:20px;font-weight:bold;">
    PREMIUM
  </div>
  <div>
    TSH ${book.plans.premium.price.toLocaleString()}
    . Unlimited Access
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
margin-top:18px;
padding:18px;
border-radius:18px;
background:linear-gradient(145deg,#0d0d0d,#1b1b1b);
border:2px solid #00ffff;
box-shadow:
0 0 20px rgba(0,255,255,.25),
inset 0 0 20px rgba(255,255,255,.03);
">

<div style="
background:linear-gradient(145deg,#0f1c1f,#122b30);
border:1px solid #00eaff;
border-radius:18px;
padding:18px;
box-shadow:0 0 18px rgba(0,255,255,.15);
font-family:Arial,sans-serif;
">

<!-- Header -->
<div style="
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:15px;
">

<div>
<div style="
color:#00ffff;
font-size:22px;
font-weight:bold;
letter-spacing:1px;
">
Secure Payment
</div>

<div style="
color:#9aa;
font-size:13px;
margin-top:3px;
">
Managed by Afrika & Co
</div>
</div>

<div style="
background:#00ff88;
color:#000;
padding:5px 12px;
border-radius:30px;
font-size:12px;
font-weight:bold;
">
VERIFIED
</div>

</div>

<!-- Owner -->
<div style="
background:rgba(255,215,0,.08);
border:1px solid rgba(255,215,0,.3);
padding:12px;
border-radius:12px;
margin-bottom:14px;
text-align:center;
">

<div style="
font-size:13px;
color:#bbb;
">
Payment Receiver
</div>

<div style="
margin-top:6px;
font-size:22px;
font-weight:bold;
color:#ffd700;
text-shadow:0 0 8px rgba(255,215,0,.5);
">
DERRICK KIPAJI
</div>

<div style="
font-size:14px;
color:#00ffff;
margin-top:2px;
">
AFRIKA & CO
</div>

</div>

<!-- Payment Options -->
<div style="
display:flex;
gap:10px;
margin-bottom:14px;
">

<div style="
flex:1;
background:#111;
padding:12px;
border-radius:12px;
border-left:4px solid #00ff88;
">

<div style="
color:#888;
font-size:12px;
">
MoMo
</div>

<div style="
margin-top:6px;
font-size:21px;
font-weight:bold;
color:#00ff88;
">
+255 763 907 868
</div>

</div>

<div style="
flex:1;
background:#111;
padding:12px;
border-radius:12px;
border-left:4px solid gold;
">

<div style="
color:#888;
font-size:12px;
">
Merchant
</div>

<div style="
margin-top:6px;
font-size:21px;
font-weight:bold;
color:#ffd700;
">
36121630
</div>

</div>

</div>

<!-- Footer -->
<div style="
background:rgba(0,255,255,.08);
padding:10px;
border-radius:10px;
text-align:center;
font-size:13px;
color:#ddd;
">
✔ Fast & Secure Mobile Payment
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
