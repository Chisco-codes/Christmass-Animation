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
  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.animationDuration = (Math.random() * 3 + 2) + "s";
  document.body.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 5000);
}

setInterval(createSnowflake, 300);

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
