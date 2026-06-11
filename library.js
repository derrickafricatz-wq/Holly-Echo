const books = [
{
  title: "How to Hear Voice of God",
  locked: true,
  pdf: "holly.pdf",
  cover: "images/co1.jpg",

  author: {
    name: "Errick H Agustino",
    payment: {
      method: "M-Pesa",
      number: "+255 767178000",
      lipaNumber: "pending",
      name: "Errick H Agustino"
    }
  },

  plans: {
    starter: { price: 1000, pages: 28 },
    standard: { price: 5000, pages: 120 },
    premium: { price: 15000, pages: null }
  }
},

{
  title: "Spiritual Eyes",
  locked: true,
  pdf: "learn.pdf",
  cover: "images/co2.jpg",

  author: {
    name: "Errick H Agustino",
    payment: {
      method: "M-Pesa",
      number: "+255 767178000",
      lipaNumber: "pending", 
      name: "Errick H Agustino"
    }
  },

  plans: {
    starter: { price: 1000, pages: 7 },
    standard: { price: 1500, pages: 13 },
    premium: { price: 3000, pages: null }
  }
}
];
