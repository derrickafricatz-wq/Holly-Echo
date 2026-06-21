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
">

  <div style="
    color:#00ffff;
    font-size:20px;
    font-weight:bold;
    margin-bottom:8px;
  ">
     💳${book.author.payment.method}
  </div>

  <div style="
    font-size:18px;
    color:white;
">
    Number: <b>${book.author.payment.number}</b>
</div>

${book.author.payment.lipaNumber ? `
<div style="
    font-size:18px;
    color:white;
">
    LIPA Number: <b>${book.author.payment.lipaNumber}</b>
</div>
` : ""}

${book.author.payment.lipaName ? `
<div style="
    font-size:18px;
    color:white;
">
    LIPA Name: <b>${book.author.payment.lipaName}</b>
</div>
` : ""}

  <div style="
    font-size:18px;
    color:#ffcc00;
    margin-top:5px;
  ">
    Name: <b>${book.author.payment.name}</b>
  </div>

</div>

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
