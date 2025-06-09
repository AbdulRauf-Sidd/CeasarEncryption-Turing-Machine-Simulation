document.getElementById("start").addEventListener("click", function () {
  const msg = document.getElementById("message").value;
  const shift = parseInt(document.getElementById("shift").value, 10);
  const mode = document.getElementById("mode").value;
  const isDecrypt = (mode === "decrypt");

  const tapeDiv = document.getElementById("tape");
  const output = document.getElementById("output");
  tapeDiv.innerHTML = "";
  output.textContent = "";

  // Create tape cells
  for (let i = 0; i < msg.length; i++) {
    let span = document.createElement("span");
    span.className = "cell";
    span.textContent = msg[i];
    span.dataset.index = i;
    tapeDiv.appendChild(span);
  }

  let cells = document.querySelectorAll(".cell");
  let i = isDecrypt ? cells.length - 1 : 0;

  const interval = setInterval(() => {
    if (isDecrypt ? i < 0 : i >= cells.length) {
      clearInterval(interval);
      const result = Array.from(cells).map(cell => cell.textContent).join("");
      output.textContent = (isDecrypt ? "Decrypted: " : "Encrypted: ") + result;
      return;
    }

    cells.forEach(cell => cell.classList.remove("active"));
    cells[i].classList.add("active");

    let char = cells[i].textContent;
    let newChar = shiftChar(char, shift, isDecrypt);
    cells[i].textContent = newChar;

    i += isDecrypt ? -1 : 1;
  }, 400);
});

function shiftChar(char, shift, isDecrypt) {
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const alphaU = alpha.toUpperCase();
  let idx = alpha.indexOf(char);

  if (idx !== -1) {
    let newIdx = (idx + (isDecrypt ? -shift : shift) + 26) % 26;
    return alpha[newIdx];
  }

  idx = alphaU.indexOf(char);
  if (idx !== -1) {
    let newIdx = (idx + (isDecrypt ? -shift : shift) + 26) % 26;
    return alphaU[newIdx];
  }

  return char;
}
