/***********************
 * 🎯 DATE PHASE LOGIC
 ***********************/
const today = new Date();
const month = today.getMonth(); // December = 11
const day = today.getDate();

const isChristmasDay = month === 11 && day === 25;
const isBoxingDay = month === 11 && day === 26;
const isHolidaySeason = month === 11 && day >= 27 && day <= 31;
const isNewYearDay = month === 0 && day === 1;

/***********************
 * 🎁 WISHES BY PHASE
 ***********************/
const christmasWishes = [
  "🎄 Merry Christmas! May your home be filled with love and laughter.",
  "🎅 Warm wishes for peace, joy, and beautiful memories this Christmas.",
  "✨ May this Christmas wrap you in comfort, hope, and happiness.",
  "🎁 Sending you heartfelt Christmas wishes and festive cheer!",
  "🕯 May the light of Christmas bring calm and inspiration to your heart."
];

const boxingDayWishes = [
  "🎁 Happy Boxing Day! Enjoy rest, reflection, and great surprises.",
  "🥊 Wishing you a relaxed Boxing Day filled with joy and good vibes.",
  "✨ May today bring simple pleasures and unexpected smiles.",
  "🛍 Boxing Day blessings — peace, fun, and small victories!",
  "☕ A perfect day to relax, recharge, and enjoy the moment."
];

const holidayWishes = [
  "✨ The festive season continues — may joy follow you everywhere.",
  "🎆 A beautiful ending is preparing a powerful new beginning.",
  "🌟 May your dreams take clearer shape as the New Year approaches.",
  "🥂 Cheers to growth, reflection, and exciting possibilities ahead!",
  "💫 Close this year with gratitude and open the next with courage."
];

const newYearWishes = [
  "🎆 Happy New Year! A fresh chapter begins today.",
  "🌟 May this year reward your efforts and strengthen your purpose.",
  "🚀 New goals, new energy, new victories — you’ve got this!",
  "💖 Health, success, and peace — may they follow you daily.",
  "🔥 This is your year to rise, build, and shine."
];

let wishes = holidayWishes;
if (isChristmasDay) wishes = christmasWishes;
else if (isBoxingDay) wishes = boxingDayWishes;
else if (isNewYearDay) wishes = newYearWishes;

/***********************
 * 🎁 WISH BUTTON
 ***********************/
function wish() {
  const message = document.getElementById("message");
  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  message.textContent = randomWish;
}

/***********************
 * 🎁 TOP BANNER (AUTO)
 ***********************/
(function autoBanner() {
  const banner = document.getElementById("christmas-today");
  if (!banner) return;

  if (isChristmasDay) banner.textContent = "🎄 Merry Christmas — A Day of Love & Light 🎄";
  else if (isBoxingDay) banner.textContent = "🎁 Happy Boxing Day — Relax & Enjoy 🎉";
  else if (isHolidaySeason) banner.textContent = "✨ Holiday Season — New Year Is Near 🎆";
  else if (isNewYearDay) banner.textContent = "🎆 Happy New Year — New Beginnings 🎆";

  if (isChristmasDay || isBoxingDay || isHolidaySeason || isNewYearDay) banner.style.display = "block";
})();

/***********************
 * 🎆 NEW YEAR COUNTDOWN
 ***********************/
function updateCountdown() {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  const diff = newYear - now;

  document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").innerText = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
}
setInterval(updateCountdown, 1000);
updateCountdown();

/***********************
 * ❄ SNOW EFFECT
 ***********************/
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

/***********************
 * 🎵 MUSIC CONTROL
 ***********************/
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isPlaying = false;

function playMusicOnce() {
  if (!isPlaying) {
    music.play().then(() => {
      isPlaying = true;
      musicBtn.textContent = "🔇 Pause Music";
    }).catch(() => {});
  }
}

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

/***********************
 * 🎄 FESTIVE POPUP
 ***********************/
const popup = document.getElementById("christmas-popup");
const openBtn = document.getElementById("open-popup-btn");
const closeBtn = document.getElementById("close-popup-btn");
const popupActionBtn = document.getElementById("popup-action-btn");
const popupText = popup ? popup.querySelector("p") : null;

function updatePopupContent() {
  if (!popupText) return;

  if (isChristmasDay) popupText.textContent = "May today bring warmth, love, and meaningful moments to your heart.";
  else if (isBoxingDay) popupText.textContent = "Relax, recharge, and enjoy the calm joy of today.";
  else if (isNewYearDay) popupText.textContent = "A new chapter begins — may it be filled with success and peace.";
  else popupText.textContent = "The year is ending beautifully — something amazing is ahead.";
}

function openPopup() {
  updatePopupContent();
  popup.style.display = "flex";
  playMusicOnce(); // 🎵 Auto music plays when first popup shows
  if (typeof confetti === "function") confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
}

function closePopup() {
  popup.style.display = "none";
}

if (openBtn) openBtn.addEventListener("click", openPopup);
if (closeBtn) closeBtn.addEventListener("click", closePopup);
if (popupActionBtn) popupActionBtn.addEventListener("click", closePopup);

/***********************
 * 🎁 AUTO FESTIVE POPUP
 ***********************/
(function autoPopup() {
  if (sessionStorage.getItem("holidayPopupSeen")) return;
  if (isChristmasDay || isBoxingDay || isHolidaySeason || isNewYearDay) {
    sessionStorage.setItem("holidayPopupSeen", "true");
    openPopup();
  }
})();

/***********************
 * 🎁 LUCKY BOX POPUP
 ***********************/
const luckyMessages = {
  christmas: [
    "🎄 Embrace love and laughter today — something magical awaits!",
    "✨ Your heart will feel extra warm this Christmas.",
    "🎁 An unexpected joy is coming your way."
  ],
  boxing: [
    "🥊 Release old habits today — peace and fun are yours!",
    "🛍 Something small today brings big happiness.",
    "☕ A quiet moment today will refresh your spirit."
  ],
  holiday: [
    "🌟 An unexpected twist could change your week — stay alert!",
    "🎆 Reflect and let go, new surprises are coming soon.",
    "💫 Opportunity appears where you least expect it."
  ],
  newYear: [
    "🎆 Bold action today leads to incredible results.",
    "🚀 Let go of what no longer serves you — growth is near!",
    "💖 New connections will bring unexpected happiness."
  ]
};

const luckyPopup = document.getElementById("lucky-popup");
const luckyPopupMessage = document.getElementById("lucky-popup-message");
const closeLuckyPopupBtn = document.getElementById("close-lucky-popup");
let luckyClicks = 0;

closeLuckyPopupBtn.addEventListener("click", () => {
  luckyPopup.style.display = "none";
});

document.querySelectorAll(".lucky-box").forEach(box => {
  box.addEventListener("click", () => {
    if (luckyClicks >= 3) {
      alert("🎉 You have opened all your lucky boxes! Please refresh the page to try again.");
      return;
    }

    let phaseMsgs;
    if (isChristmasDay) phaseMsgs = luckyMessages.christmas;
    else if (isBoxingDay) phaseMsgs = luckyMessages.boxing;
    else if (isNewYearDay) phaseMsgs = luckyMessages.newYear;
    else phaseMsgs = luckyMessages.holiday;

    const randomMessage = phaseMsgs[Math.floor(Math.random() * phaseMsgs.length)];
    luckyPopupMessage.textContent = randomMessage;
    luckyPopup.style.display = "flex";

    luckyClicks++;
    if (typeof confetti === "function") confetti({ particleCount: 150, spread: 90, origin: { y: 0.7 } });
  });
});
