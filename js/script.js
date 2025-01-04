const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const saveButtonContainer = document.getElementById("saveButton");

// Hide the save button container initially
saveButtonContainer.style.display = 'none';

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // Validate URL
  if (url === "") {
    alert("Please enter a URL");
    return;
  }

  showSpinner();

  // Simulate QR code generation delay
  setTimeout(() => {
    hideSpinner();
    generateQRCode(url, size);

    // Ensure QR code is generated
    setTimeout(() => {
      const canvas = qr.querySelector("canvas");
      if (canvas) {
        console.log("QR code canvas found");
        const saveUrl = canvas.toDataURL(); // Generate image URL from canvas
        createSaveBtn(saveUrl); // Create save button
        saveButtonContainer.style.display = 'block'; // Show save button
      } else {
        console.error("QR code canvas not found!");
      }
    }, 50);
  }, 1000);
};

// Generate QR code
const generateQRCode = (url, size) => {
  console.log("Generating QR code...");
  new QRCode(qr, {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  console.log("Clearing UI...");
  qr.innerHTML = ""; // Clear QR code
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove(); // Remove save button if it exists
  }
  saveButtonContainer.style.display = 'none'; // Hide save button container
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  console.log("Creating save button...");
  const link = document.createElement("a");
  link.id = "save-link";
  link.className =
    ' text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.innerHTML = "Save QR Code";

  link.href = saveUrl;
  link.download = "qrcode.png";

  // Append the save button to the saveButtonContainer
  saveButtonContainer.appendChild(link);
};

hideSpinner();

// Add event listener to form
form.addEventListener("submit", onGenerateSubmit);
