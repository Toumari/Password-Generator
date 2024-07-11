const slider = document.querySelector(".length");
const lengthDisplay = document.querySelector(".length-display");
const submitBtn = document.querySelector(".submit-btn");
const passwordDisplay = document.querySelector(".password");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const indicators = document.querySelectorAll(".indicator .bar");
const strengthBarLabel = document.querySelector(".strength-bar-label");
const small = document.querySelector("small");
const clipboard = document.querySelector(".clipboard");

let strength = 0;

slider.addEventListener("input", () => {
  lengthDisplay.innerText = slider.value;
});

slider.addEventListener("change", () => {
  if (slider.value == 0) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    strength += checkbox.checked ? 1 : -1;
    updateStrength();
  });
});

const updateStrength = () => {
  const strengths = ["Weak", "Medium", "Strong", "Very Strong"];

  indicators.forEach((bar, index) => {
    bar.style.backgroundColor = index < strength ? "#e2e182" : "grey";
  });

  if (!strength) {
    strengthBarLabel.innerText = "";
    submitBtn.disabled = true;
  } else if (strength) {
    submitBtn.disabled = false;
    strengthBarLabel.innerText = strengths[strength - 1];
  }
};

const generatePassword = () => {
  const len = slider.value;
  let selectedChars = "";

  if (document.querySelector("#uppercase").checked)
    selectedChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (document.querySelector("#lowercase").checked)
    selectedChars += "abcdefghijklmnopqrstuvwxyz";
  if (document.querySelector("#numbers").checked) selectedChars += "0123456789";
  if (document.querySelector("#symbols").checked)
    selectedChars += "!@#$%^&*()_+-=[]{};':,.<>?";

  if (selectedChars === "") {
    alert("Please select at least one character type");
    return;
  } else {
    passwordDisplay.style.color = "white";
  }

  let password = Array.from({ length: len }, () =>
    selectedChars.charAt(Math.floor(Math.random() * selectedChars.length))
  ).join("");
  passwordDisplay.innerText = password;
};

function updateTrackColor(value) {
  const percentage = (value / (slider.max - slider.min)) * 120;
  slider.style.backgroundImage = `linear-gradient(to right, green 0%, #090a09 ${percentage}%)`;
}

// Update track color on initial load
updateTrackColor(slider.value);

// Update track color on slider movement
slider.addEventListener("input", (event) => {
  updateTrackColor(event.target.value);
});

submitBtn.addEventListener("click", generatePassword);

clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = passwordDisplay.innerText;

  if (!password || password === "P$ssw0rd") {
    alert("No password to copy");
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  alert("Password copied to clipboard");
});

updateStrength();
