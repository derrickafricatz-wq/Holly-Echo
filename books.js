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

 async function unlockBook() {

     const unlockBtn = document.getElementById("unlockBtn");

     if (unlockBtn.disabled) return;

     unlockBtn.disabled = true;
     unlockBtn.innerText = "Checking...";

   // safety reset so it never gets stuck
    setTimeout(() => {
     unlockBtn.disabled = false;
     unlockBtn.innerText = "Unlock Book";
   }, 12000);

      if (!selectedBookToUnlock && pendingUnlockBook) {
      selectedBookToUnlock = pendingUnlockBook;
     }

     console.log("selectedBookToUnlock:", selectedBookToUnlock);
     console.log("pendingUnlockBook:", pendingUnlockBook);
     console.log("selectedPDF:", selectedPDF);

      let userKey = document.getElementById("key").value;
      userKey = userKey.trim();
      let msg = document.getElementById("msg");

      if (!userKey) {
     msg.innerHTML = "Please enter your license key";
     return;
      }

      let { data, error } = await client
      .from("licenses")
      .select("*")
      .eq("key", userKey)
      .eq("book_pdf", selectedBookToUnlock.pdf)
      .single();

     if (error) {
       msg.innerHTML = "Unexpected License, Contact admin";

       unlockBtn.disabled = false;
       unlockBtn.innerText = "Unlock Book";
       
       return; 
      }

      if (!data) {
      msg.innerHTML = "Unexpected License, Contact admin";
      return;
      }

      let license = data;

      activeLicense = license;
userPackage = license.package || "starter";

localStorage.setItem("activeLicense", JSON.stringify(license));

console.log("License package:", license.package);
console.log("Book:", selectedBookToUnlock.title);

if (!license) {
  msg.innerHTML = "License not found";
  return;
}

if (license.status !== "active") {
  msg.innerHTML = "secured by deka 🔐";
  return;
}

if (license.book_pdf !== selectedBookToUnlock.pdf) {
  msg.innerHTML = "This license is not valid for this book 🔐";
  return;
}

if (!license.package) {
  msg.innerHTML = "License missing package type 🔐";
  return;
}

      let deviceID = localStorage.getItem("deviceID");

      if (!deviceID) {
        deviceID = "DEV-" + Math.random().toString(36).substring(2);
        localStorage.setItem("deviceID", deviceID);
      }

      if (!license.device_id) {

  const { error } = await client
    .from("licenses")
    .update({
      device_id: deviceID,
      status: "active"
    })
    .eq("id", license.id);

  if (error) {
    msg.innerHTML = "Device binding failed";
    return;
  }
}

      if (license.device_id && license.device_id !== deviceID) {
      msg.innerHTML = "This license is locked to another device 🔐";
      return;
      }

      msg.innerHTML = "Access Granted ";

      unlockedBooksSet.add(selectedBookToUnlock.title);

      selectedBookToUnlock.locked = false;

      updateCart();

      const bookToOpen = pendingUnlockBook || selectedBookToUnlock;

      if (!bookToOpen) {
      msg.innerHTML = "No book selected";
      return;
     }

     selectedPDF = bookToOpen.pdf;

     console.log("Opening PDF:", selectedPDF);

     setTimeout(() => {

  document.getElementById("licenseScreen").style.display = "none";
  document.getElementById("upgradeBox").style.display = "none";
  document.getElementById("storePanel").style.display = "none";

  document.getElementById("book").style.display = "block";

  // FORCE SAFE STATE BEFORE OPENING PDF
  pageNum = 1;

  if (!selectedPDF) {
    console.error("No selectedPDF found");
    msg.innerHTML = "Book not selected";
    return;
  }

  renderPDF();

}, 300); 

      }
