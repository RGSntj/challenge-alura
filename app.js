// selectors
const nullableMesage = document.getElementById("info-message");
const message = document.getElementById("message");
const buttonEncrypt = document.getElementById("encrypt");
const buttonDecrypt = document.getElementById("decrypt");
const result = document.getElementById("result-content");
const buttonCopy = document.getElementById("copy-button");

// "Chave" para fazer a criptografia
const sub = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

buttonCopy.addEventListener("click", () => {
  writeClipboardText(result.textContent);
});

buttonEncrypt.addEventListener("click", () => encryptMessage(message.value));
buttonDecrypt.addEventListener("click", () => decryptMessage(message.value));

function verifyMessage(text) {
  let reg = /[A-Z]/g;

  return reg.test(text);
}

function encryptMessage(message) {
  let isUpperCase = verifyMessage(message);

  if (isUpperCase) {
    return Toastify({
      text: "Apenas letras minusculas !",
      position: "center",
      style: {
        background: "linear-gradient(to right, #cb2d3e, #ef473a)",
      },
    }).showToast();
  }

  const subscribeLetter = (letter) => sub[letter] || letter;

  const encryptMsg = message.split("").map(subscribeLetter).join("");

  nullableMesage.style.display = "none";
  result.style.display = "block";
  result.textContent = encryptMsg;
  buttonCopy.disabled = !result.textContent.trim();
}

function decryptMessage(message) {
  let messageDecrypted = message
    .replace(/enter/g, "e")
    .replace(/ai/g, "a")
    .replace(/imes/g, "i")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");

  nullableMesage.style.display = "none";
  result.style.display = "block";
  result.textContent = messageDecrypted;

  buttonCopy.disabled = !result.textContent.trim();
}

function writeClipboardText(text) {
  if (!navigator.clipboard) {
    return false;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      // alert("Mensagem copiada com sucesso !");
      Toastify({
        text: "Texto copiado com sucesso !",
        position: "center",
        // className: "succefull",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    })
    .catch((e) => console.log("Não foi possivel copiar a mensagem !"));

  clearFields();
}

function clearFields() {
  message.value = "";
  result.textContent = "";
  result.style.display = "none";
  nullableMesage.style.display = "block";
}
