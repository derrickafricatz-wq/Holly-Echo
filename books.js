function updateCart() {

  console.log("Saving:", [...unlockedBooksSet]);

  document.getElementById("cartCount").innerText =
    "🛒 [" + unlockedBooksSet.size + "]";

  localStorage.setItem(
    "unlockedBooks",
    JSON.stringify([...unlockedBooksSet])
  );

  console.log(
    "Stored:",
    localStorage.getItem("unlockedBooks")
  );
}

    async function readBook() {

  if (!pdfDoc) return;

  let text = await getPageText(pageNum);

  if (!text || text.trim().length === 0) {
    alert("No text found on this page");
    return;
  }

  const currentBook =
    books.find(b => b.pdf === selectedPDF);

  let speech = new SpeechSynthesisUtterance(text);

  speech.lang =
    currentBook?.language || "en-US";

  speech.rate = speechSpeed;

  if (currentSpeech) {
    window.speechSynthesis.cancel();
  }

  currentSpeech = speech;

  window.speechSynthesis.speak(speech);

    }
