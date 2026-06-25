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
color:#00ffff;
font-size:22px;
font-weight:bold;
margin-bottom:12px;
">
💳 PAY TO
</div>

<div style="
font-size:18px;
color:white;
margin-bottom:5px;
">
 Via|Momo|M.pesa
</div>

<div style="
font-size:22px;
font-weight:bold;
color:#00ff88;
">
+255 763907868
</div>

<hr style="
border:none;
border-top:1px solid #333;
margin:15px 0;
">

<div style="
font-size:18px;
color:white;
margin-bottom:5px;
">
 Via|Merchant|M.pesa
</div>

<div style="
font-size:22px;
font-weight:bold;
color:#00ff88;
">
36121630
</div>

<div style="
font-size:16px;
color:#ffcc00;
margin-top:5px;
">
Voice Of God
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
href="https://wa.me/255763907868?text=Hello%20Voice%20Of%20God,%0A%0AI%20have%20paid%20for%20the%20book:%20${encodeURIComponent(book.title)}%0A%0APayer%20Name:%20_____________%0A%0APlease%20verify%20my%20payment%20and%20send%20my%20license."
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
