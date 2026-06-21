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
