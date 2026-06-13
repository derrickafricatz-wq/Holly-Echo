const marketAds = [

{
  company: "DEKA TECHNOLOGIES",
  phone: "+255742097868",
  location: "Arusha, Tanzania",

  images: [
    "images/logo.png",
    "images/1c.jpg",
    "images/1d.jpg"
  ]
},

{
  company: "BULK TRADERS",
  phone: "+255700000000",
  location: "Arusha, Tanzania",

  images: [
    "images/2a.jpg",
    "images/2b.jpg"
  ]
}

];

function renderMarket() {

  const container =
    document.getElementById("marketAds");

  if (!container) return;

  container.innerHTML = "";

  marketAds.forEach((company, index) => {

    container.innerHTML += `

      <div class="marketCard" id="company-${index}" style="
        background:#111;
        border:1px solid #00ffff;
        border-radius:15px;
        padding:15px;
        margin-bottom:20px;
      ">

        <img
          id="billboard-${index}"
          src="${company.images[0]}"
          style="
            width:100%;
            border-radius:10px;
          "
        >

        <h2 style="color:#00ffff;">
          ${company.company}
        </h2>

        <p>${company.location}</p>

        <p>${company.phone}</p>

      </div>

    `;

  });

}
