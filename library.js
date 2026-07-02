let books = [
{
  title: "How to Hear Voice of God",
  language: "en-US",
  locked: true,
  pdf: "books/voice of god.pdf",
  cover: "images/er2.jpg",
  startReadingPage: 9,

  author: {
    author: "Errick H Agustino"
  },

  plans: {
    starter: { price: 1000, pages: 28 },
    standard: { price: 5000, pages: 120 },
    premium: { price: 15000, pages: null }
  }
},

{
  title: "Spiritual Eyes",
  language: "en-US",
  locked: true,
  pdf: "books/spiritual.pdf",
  cover: "images/er1.jpg",
  startReadingPage: 3,

  author: {
    author: "Errick H Agustino"
  },

  plans: {
    starter: { price: 500, pages: 2 },
    standard: { price: 1000, pages: 5 },
    premium: { price: 2000, pages: null }
  }
},

 {
  title: "Wito Wa Kumtumikia Mungu",
  language: "sw-TZ",
  locked: true,
  pdf: "books/wito wa kumtumikia mungu.pdf",
  cover: "images/b20.jpg",
  startReadingPage: 12,

  author: {
    author: "Abubakar Sheshe"
  },

  plans: {
    starter: { price: 2000, pages: 19 },
    standard: { price: 5000, pages: 41 },
    premium: { price: 10000, pages: null }
  }
},

  {
  title: "Siri Za Mafanikio Ya Maisha",
  language: "sw-TZ",
  locked: true,
  pdf: "books/siri za mafanikio ya maisha.pdf",
  cover: "images/vg.jpg",
  startReadingPage: 12,

  author: {
    author: "Abubakar Sheshe"
  },

  plans: {
    starter: { price: 3000, pages: 17 },
    standard: { price: 7000, pages: 54 },
    premium: { price: 15000, pages: null }
  }
}
];

async function loadBooksFromSupabase() {
  
  const { data, error } = await client
    .from("books")
    .select("*");

  if (error) {
  alert("Supabase Error: " + error.message);
  return;
}

 alert(JSON.stringify(data[0], null, 2));

  if (error) {
    console.error("Books Error:", error);
    return;
  }

  books = data.map(row => ({
  title: row.title,
  language: row.language,
  locked: true,

  pdf: "https://xbemkmvvbkxknuduthsg.supabase.co/storage/v1/object/public/books/" + row.pdf_url,

  cover: "https://xbemkmvvbkxknuduthsg.supabase.co/storage/v1/object/public/covers/" + row.cover_url,

  startReadingPage: row.start_reading_page,

  author: {
    author: row.author_name
  },

  plans: {
    starter: {
      price: row.starter_price,
      pages: row.starter_pages
    },

    standard: {
      price: row.standard_price,
      pages: row.standard_pages
    },

    premium: {
      price: row.premium_price,
      pages: null
    }
  }
}));

renderBooks();
