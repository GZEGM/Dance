function createFlower() {
  const flower = document.createElement("img");
  const flowerImages = [
    "./assets/hoa1.png",
    "./assets/hoa1.png",
    "./assets/hoa1.png",
    "./assets/hoa1.png",
    "./assets/hoa1.png",
  ];
  flower.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
  flower.classList.add("flower");
  flower.style.position = "fixed";
  flower.style.bottom = "0";
  flower.style.left = Math.random() * 100 + "vw";
  flower.style.width = Math.random() * 40 + 40 + "px";
  flower.style.transformOrigin = "bottom center";
  flower.style.pointerEvents = "none";
  document.body.appendChild(flower);

  let angle = Math.random() * Math.PI * 2;
  const swaySpeed = Math.random() * 0.02 + 0.01;
  const swayRange = Math.random() * 8 + 5;

  function animate() {
    angle += swaySpeed;
    const rotation = Math.sin(angle) * swayRange;
    flower.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

for (let i = 0; i < 10; i++) {
  setTimeout(createFlower, i * 200);
}

const imageList = [
  "./assets/roboki/a1.png",
  "./assets/roboki/a6.png",
  "./assets/roboki/a7.png",
  "./assets/roboki/a2.png",
  "./assets/roboki/a5.png",
  "./assets/roboki/a8.png",
  "./assets/roboki/a9.png",
  "./assets/roboki/a3.png",
  "./assets/roboki/a4.png",
  "./assets/roboki/a10.png",
  "./assets/roboki/a11.png",
];

const textList = [
  "11A1 Quá Đỉnh!",
  "Chúc mừng 11A1!",
  "11A1 Vô Địch!",
  "Tự hào 11A1!",
  "11A1 Siêu Nhân!",
  "11A1 Bất Bại!",
  "11A1 Rực Rỡ!",
  "11A1 Tỏa Sáng!",
  "11A1 Vui Nhộn!",
  "11A1 Đoàn Kết!",
  "11A1 Hạnh Phúc!",
];

let messages = imageList.map((img, i) => ({
  img,
  text: textList[i] || textList[textList.length - 1],
}));

let currentMessageIndex = 0;
let hasFirstLetterFallen = false;

const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const popupImage = document.getElementById("popupImage");
const popupMessage = document.getElementById("popupMessage");
const centerText = document.getElementById("centerText");
const letterImages = [
  "./assets/letters.png",
  "./assets/q3.png",
  "./assets/h1.png",
  "./assets/roboki/a5.png",
  "./assets/t2.png",
  "./assets/roboki/a2.png",
  "./assets/t5.png",
];

function createHeartExplosion(x, y) {
  //Thay icon khi ấn thư, hoa, quà
  const hearts = ["💗"];
  const numHearts = 6;

  for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const angle = ((Math.PI * 2) / numHearts) * i;
    const distance = Math.random() * 80 + 40;

    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    heart.style.setProperty("--dy", Math.sin(angle) * distance + "px");
    heart.style.fontSize = Math.random() * 10 + 20 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  }
}

function createFallingLetter() {
  const letter = document.createElement("img");
  const randomImage =
    letterImages[Math.floor(Math.random() * letterImages.length)];
  letter.src = randomImage;
  letter.classList.add("falling-letter");
  letter.style.left = Math.random() * (window.innerWidth - 50) + "px";
  letter.addEventListener("click", (e) => {
    createHeartExplosion(e.clientX, e.clientY);
    letter.classList.add("letter-clicked");
    setTimeout(() => {
      showPopup();
    }, 300);
  });

  document.body.appendChild(letter);

  setTimeout(() => {
    letter.remove();
  }, 8000);
}

function showPopup() {
  const message = messages[currentMessageIndex];
  popupImage.src = message.img;
  popupMessage.textContent = message.text;
  popup.style.display = "block";
  overlay.classList.add("active");

  popup.dataset.currentMessage = message.text;

  currentMessageIndex = (currentMessageIndex + 1) % messages.length;
}

function closePopup() {
  popup.style.display = "none";
  overlay.classList.remove("active");

  //   if (popup.dataset.currentMessage) {
  //     centerText.innerHTML = popup.dataset.currentMessage;
  //   }
}

document.body.addEventListener("click", function () {
  const player = document.getElementById("player");
  if (player.paused) {
    player.play();
  }
});

overlay.addEventListener("click", closePopup);
setInterval(() => {
  createFallingLetter();
}, 1000);
