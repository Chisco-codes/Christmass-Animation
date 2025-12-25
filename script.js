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
  const isChristmas = today.getMonth() === 11 && today.getDate() === 25;

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
let musicStartedOnce = false;

function startMusicOnce() {
  if (musicStartedOnce) return;

  music.play().then(() => {
    isPlaying = true;
    musicBtn.textContent = "🔇 Pause Music";
    musicStartedOnce = true;
  }).catch(() => {});

  document.removeEventListener("click", startMusicOnce);
  document.removeEventListener("touchstart", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);
document.addEventListener("touchstart", startMusicOnce);

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
const popup = document.getElementById("christmas-popup");
const openBtn = document.getElementById("open-popup-btn");
const closeBtn = document.getElementById("close-popup-btn");
const popupActionBtn = document.getElementById("popup-action-btn");

function openPopup() {
  if (!popup) return;
  popup.style.display = "flex";

  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  setTimeout(() => {
    confetti({ particleCount: 50, spread: 100, origin: { y: 0.6 } });
  }, 400);
}

function closePopup() {
  if (!popup) return;
  popup.style.display = "none";
  sessionStorage.setItem("christmasPopupSeen", "true");
}

if (openBtn) openBtn.addEventListener("click", openPopup);
if (closeBtn) closeBtn.addEventListener("click", closePopup);
if (popupActionBtn) popupActionBtn.addEventListener("click", closePopup);

(function showChristmasPopup() {
  const today = new Date();
  const isChristmas = today.getMonth() === 11 && today.getDate() === 25;
  const popupSeen = sessionStorage.getItem("christmasPopupSeen");

  if (popup && isChristmas && !popupSeen) {
    openPopup();
  }
})();
// 🎁 Lucky Box – New Year Prediction (POPUP STYLE + FLASH + SURPRISE)
const newYearFortunes = [
  "🌟 This year will open doors to exciting new opportunities!",
  "💼 Career growth and success are coming your way!",
  "❤️ Love, connection, and deeper relationships await you!",
  "✈️ Travel and new adventures will shape your year!",
  "🧠 A year of clarity, wisdom, and confident decisions!",
  "🏡 Peace, stability, and happiness will surround you!",
  "🔥 Big changes are ahead — embrace them fearlessly!",
  "💪 You’ll need to work harder this year to reach your goals!",
  "🚭 Time to leave old habits behind — like smoking or procrastination!",
  "💰 Your savings and collections will grow faster than ever!",
  "🌠 You are a destined child — special moments are coming!",
  "🎨 A hidden talent will surprise everyone!",
  "💌 Expect unexpected messages from someone inspiring!",
  "⚡ A twist of fate will challenge you but lead to a big win!",
  "🍀 Luck is on your side if you take that bold step!",
  "🛤️ A journey or relocation will change your life positively!",
  "📚 Knowledge gained now will pay off later!",
  "🎭 A surprise encounter will bring joy and laughter!",
  "🕰️ Reflection on past habits brings clarity — a new chapter begins!",
  "🎯 Focus on what matters most — you’ll hit your target sooner!"
];

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".lucky-box");
  const resultText = document.getElementById("lucky-result");

  if (!boxes.length || !resultText) return;

  // ✅ Reset sessionStorage so boxes are clickable after refresh
  sessionStorage.removeItem("luckyBoxPicked");

  // Reset clicked flags
  boxes.forEach(box => box.dataset.clicked = "");

  // Create Lucky Popup
  const luckyPopupOverlay = document.createElement("div");
  luckyPopupOverlay.className = "lucky-popup-overlay";

  const luckyPopupBox = document.createElement("div");
  luckyPopupBox.className = "lucky-popup-box";

  const closeBtn = document.createElement("button");
  closeBtn.className = "lucky-popup-close";
  closeBtn.innerHTML = "&times;";

  luckyPopupBox.appendChild(closeBtn);
  luckyPopupOverlay.appendChild(luckyPopupBox);
  document.body.appendChild(luckyPopupOverlay);

  function closeLuckyPopup() {
    luckyPopupOverlay.style.display = "none";
  }
  closeBtn.addEventListener("click", closeLuckyPopup);

  let clickedCount = 0;

  boxes.forEach(box => {
    box.addEventListener("click", () => {
      if (box.dataset.clicked === "true") return;
      box.dataset.clicked = "true";

      box.classList.add("popup-flash");
      setTimeout(() => box.classList.remove("popup-flash"), 350);

      box.classList.add("opened");
      setTimeout(() => box.classList.remove("opened"), 700);

      const fortune = newYearFortunes[Math.floor(Math.random() * newYearFortunes.length)];

      luckyPopupBox.innerHTML = fortune;
      luckyPopupBox.appendChild(closeBtn);
      luckyPopupOverlay.style.display = "flex";

      if (typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      }

      // Keep popup visible for 8 seconds
      setTimeout(closeLuckyPopup, 8000);

      clickedCount++;

      if (clickedCount >= boxes.length) {
        sessionStorage.setItem("luckyBoxPicked", "true");
        resultText.textContent = "🎆 You’ve picked all your fortunes! Refresh to try again.";
        boxes.forEach(b => b.style.pointerEvents = "none");
      }
    });
  });
});

