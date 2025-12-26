// 🎁 Random Boxing Day wishes
const wishes = [
  "🎁 Happy Boxing Day! Enjoy the deals and good vibes!",
  "🎉 Wishing you a joyful and relaxing Boxing Day!",
  "✨ May your Boxing Day be full of surprises!",
  "🥂 Cheers to rest, fun, and happiness this Boxing Day!",
  "🎆 Wishing you a Prosperous and Joyful New Year!",
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

// 🎁 Boxing Day banner (Dec 26 ONLY)
(function checkBoxingDayBanner() {
  const today = new Date();
  const isBoxingDay = today.getMonth() === 11 && today.getDate() === 26;

  const banner = document.getElementById("christmas-today");
  if (banner && isBoxingDay) {
    banner.textContent = "🎁 Happy Boxing Day! Enjoy the surprises 🎉";
    banner.style.display = "block";
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

// 🎁 Boxing Day Popup Logic
const popup = document.getElementById("christmas-popup");
const openBtn = document.getElementById("open-popup-btn");
const closeBtn = document.getElementById("close-popup-btn");
const popupActionBtn = document.getElementById("popup-action-btn");

function openPopup() {
  if (!popup) return;
  popup.style.display = "flex";

  if (typeof confetti === "function") {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }
}

function closePopup() {
  if (!popup) return;
  popup.style.display = "none";
  sessionStorage.setItem("boxingDayPopupSeen", "true");
}

if (openBtn) openBtn.addEventListener("click", openPopup);
if (closeBtn) closeBtn.addEventListener("click", closePopup);
if (popupActionBtn) popupActionBtn.addEventListener("click", closePopup);

// 🎁 Show popup ONLY on Boxing Day (Dec 26)
(function showBoxingDayPopup() {
  const today = new Date();
  const isBoxingDay = today.getMonth() === 11 && today.getDate() === 26;
  const popupSeen = sessionStorage.getItem("boxingDayPopupSeen");

  if (popup && isBoxingDay && !popupSeen) {
    const title = popup.querySelector("h2");
    const text = popup.querySelector("p");

    if (title) title.textContent = "🎁 Happy Boxing Day!";
    if (text) {
      text.innerHTML =
        "Wishing you amazing deals, warm moments, and joyful surprises✨<br>Enjoy your Boxing Day!";
    }

    openPopup();
  }
})();

// 🎁 Lucky Box – New Year Prediction
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
  boxes.forEach(box => box.dataset.clicked = "");

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

      const fortune =
        newYearFortunes[Math.floor(Math.random() * newYearFortunes.length)];

      luckyPopupBox.innerHTML = fortune;
      luckyPopupBox.appendChild(closeBtn);
      luckyPopupOverlay.style.display = "flex";

      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
      }

      setTimeout(closeLuckyPopup, 8000);

      clickedCount++;

      if (clickedCount >= boxes.length) {
        sessionStorage.setItem("luckyBoxPicked", "true");
        resultText.textContent =
          "🎆 You’ve picked all your fortunes! Refresh to try again.";
        boxes.forEach(b => (b.style.pointerEvents = "none"));
      }
    });
  });
});
