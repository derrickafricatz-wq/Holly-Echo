const marketAds = [

{
  company: "DEKA TECHNOLOGIES",
  phone: "+255742097868",
  location: "Arusha",

  whatsapp: "255742097868",

  ads: [
    ["images/logo.png", "Brand", "Contact"],
    ["images/1c.jpg", "CCTV Install", "120K"],
    ["images/1d.jpg", "Network Support", "80K"]
  ]
},

{
  company: "BULK TRADERS",
  phone: "+255700000000",
  location: "Arusha",

  whatsapp: "255700000000",

  ads: [
    ["images/2a.jpg", "Materials", "Quote"],
    ["images/2b.jpg", "Tools", "50K"]
  ]
}

];

function renderMarket() {

  const container = document.getElementById("marketAds");
  if (!container) return;

  container.innerHTML = "";

  marketAds.forEach((company, index) => {

    const firstAd = company.ads?.[0] || [];

    container.innerHTML += `

      <div class="marketCard" style="
        background:#111;
        border:1px solid #00ffff;
        border-radius:15px;
        padding:15px;
        margin-bottom:20px;
      ">

        <img
          id="billboard-${index}"
          src="${firstAd[0] || ''}"
          style="
            width:100%;
            border-radius:10px;
            opacity:1;
            transition:opacity 1.2s ease-in-out;
          "
        >

        <h2 style="color:#00ffff;margin:10px 0 5px;">
          ${firstAd[1] || company.company}
        </h2>

        <p style="margin:0;font-size:18px;">
          💰 ${firstAd[2] || ""}
        </p>

        <p style="margin:8px 0;">
          📍 ${company.location}
        </p>

        <p>
          📞 
          <a href="tel:${company.phone}" style="color:#00ffff;text-decoration:none;">
            ${company.phone}
          </a>
        </p>

        <p>
          💬 
          <a href="https://wa.me/${company.whatsapp}" target="_blank" style="color:#00ff88;text-decoration:none;">
            WhatsApp
          </a>
        </p>

      </div>

    `;

  });

}

let marketStarted = false;

function startMarketRotations() {

if (marketStarted) return;

marketStarted = true;

  marketAds.forEach((company, index) => {

    let imageIndex = 0;

    setInterval(() => {

      imageIndex++;

      if (imageIndex >= company.images.length) {
        imageIndex = 0;
      }

      const billboard =
        document.getElementById(
          `billboard-${index}`
        );

      if (billboard) {

  billboard.style.opacity = "0";

setTimeout(() => {

  billboard.src =
    company.images[imageIndex];

  setTimeout(() => {

    billboard.style.opacity = "1";

  }, 100);

}, 800);

      }

    }, 3000);

  });

}
