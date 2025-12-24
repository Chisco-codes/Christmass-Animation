// Random wishes (Christmas + New Year)
const wishes = [
  "🎅 Merry Christmas and Happy Holidays!",
  "🎄 Wishing you joy and peace this Christmas!",
  "✨ May your days be merry and bright!",
  "❄ Sending love and warmth this season!",
  "🎆 Wishing you a Prosperous and Joyful New Year!",
  "🥂 Cheers to a New Year filled with success and happiness!",
  "🌟 May the New Year bring you peace, health, and prosperity!"
];

function wish() {
  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  document.getElementById("message").innerText = randomWish;
}

// Snowfall effect
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄";

  // Limit snowflake horizontal position within viewport
  const maxWidth = window.innerWidth - 20; 
  snowflake.style.left = Math.random() * maxWidth + "px";

  // Randomize size and speed
  const size = Math.random() * 8 + 12; // 12px to 20px
  snowflake.style.fontSize = size + "px";

  const duration = Math.random() * 3 + 2; // 2s to 5s
  snowflake.style.animationDuration = duration + "s";

  document.body.appendChild(snowflake);

  // Remove snowflake after animation ends
  setTimeout(() => snowflake.remove(), duration * 1000);
}

// Adjust snowflake interval for smaller screens
let snowInterval = 300;
if (window.innerWidth < 480) snowInterval = 600; // slower on phones

setInterval(createSnowflake, snowInterval);

// Background music control
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    musicBtn.textContent = "🔇 Pause Music";
  } else {
    music.pause();
    musicBtn.textContent = "🔊 Play Music";
  }
  isPlaying = !isPlaying;
});
