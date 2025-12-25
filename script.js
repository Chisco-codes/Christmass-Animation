// 🎄 Random wishes
const wishes = [
  "🎅 Merry Christmas and Happy Holidays!",
  "🎄 Wishing you joy and peace this Christmas!",
  "✨ May your days be merry and bright!",
  "❄ Sending love and warmth this season!",
  "🎆 Wishing you a Prosperous and Joyful New Year!",
  "🥂 Cheers to a New Year filled with success and happiness!",
  "🌟 May the New Year bring you peace, health, and prosperity!"
];

const clickSound = document.getElementById("click-sound");

function wish() {
  const message = document.getElementById("message");
  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  message.innerText = randomWish;

  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }
}

// 🎄 Show message ONLY on Christmas Day
(function checkChristmasDay() {
  const today = new Date();
  const isChristmas =
    today.getMonth() === 11 && today.getDate() === 25; // December is month 11

  const christmasBanner = document.getElementById("christmas-today");
  if (christmasBanner && isChristmas) {
    christmasBanner.style.display = "block";
  }
})();

// 🎆 Countdown to New Year
function updateCountdown() {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  const diff = newYear - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ❄ Snowfall effect (stable)
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.textContent = "❄";

  snowflake.style.left = Math.random() * (window.innerWidth - 20) + "px";
  snowflake.style.fontSize = Math.random() * 10 + 12 + "px";
  snowflake.style.animationDuration = Math.random() * 3 + 3 + "s";

  document.body.appendChild(snowflake);

  setTimeout(() => snowflake.remove(), 6000);
}

setInterval(createSnowflake, window.innerWidth < 480 ? 700 : 400);

// 🎵 Background music control
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play().catch(() => {});
    musicBtn.textContent = "🔇 Pause Music";
  } else {
    music.pause();
    musicBtn.textContent = "🔊 Play Music";
  }
  isPlaying = !isPlaying;
});

// 🎄 Christmas Popup Logic
function closePopup() {
  document.getElementById("christmas-popup").style.display = "none";
  sessionStorage.setItem("christmasPopupSeen", "true");
}

(function showChristmasPopup() {
  const today = new Date();
  const isChristmas =
    today.getMonth() === 11 && today.getDate() === 25;

  const popupSeen = sessionStorage.getItem("christmasPopupSeen");
  const popup = document.getElementById("christmas-popup");

  if (popup && isChristmas && !popupSeen) {
    popup.style.display = "flex";
  }
})();

