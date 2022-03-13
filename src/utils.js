var heartCount = 0;
var clickData = [];
var typingImgPosition = {};
function generateClientID(overSize) {
  if (overSize) {
    clientID =
      clientID.substr(0, clientID.length - 5) + dayjs().format("DD_MM");
    localStorage.setItem("client-id", clientID);
    return;
  }
  if (md.is("iPhone")) {
    clientID = "ip_" + md.version("iOS") + "_" + dayjs().format("DD_MM");
  }

  if (localStorage.getItem("client-id")) {
    clientID = localStorage.getItem("client-id");
  } else {
    localStorage.setItem("client-id", clientID);
  }
}

function handleSnapshotSize() {
  if (localStorage.getItem("snap-size")) {
    snapShotSize = localStorage.getItem("snap-size");
  } else {
    localStorage.setItem("snap-size", 0);
  }
}

function validateInput(hour, minute) {
  if (hour > 23 || minute > 59) {
    return "Em định thử anh đấy à?";
  }
  if (hour >= 20 && hour < 24) {
    return "Giờ này tính giờ để làm gì?";
  }
  if (hour === 3) {
    return "Ngủ đi em. Giờ này dậy làm gì?";
  }
  if (hour >= 0 && hour < 3) {
    return "Sao giờ này còn thức?";
  }
}

function isSleepTime() {
  const curTime = dayjs();
  const sleepHourAm = 4;
  const sleepHourPm = 22;
  // 04:00 at the same curTime DAY
  const sleepAmDate = dayjs().hour(sleepHourAm).minute(0).second(0);
  // 22:00 at the same curTime DAY
  const sleepPmDate = dayjs().hour(sleepHourPm).minute(0).second(0);
  return curTime.isBefore(sleepAmDate) || curTime.isSameOrAfter(sleepPmDate);
}

function clock() {
  if (isLoadBeforeSleep && !isSleep && isSleepTime()) {
    isSleep = true;
    sleepInit();
    // showMsg('Toy đã fix ròi nhaá');
  }
  setTimeout(() => {
    clock();
  }, 1000);
}

function sendMail({ clientID, reason }) {
  fetch(
    `https://nextjs-thaison95.vercel.app/api/send-mail?clientID=${clientID}_${reason}&time=${dayjs().format('DD.MM-HH.mm.ss')}`,
    { mode: "no-cors" }
  );
}

function initHeartCal() {
  typingImgPosition = document
    .getElementById("typingImg")
    .getBoundingClientRect();
}

function drawHeart() {
  heartCount += 1;
  if (heartCount > 99) return;
  clickData.push({ heartCount, speed: dayjs().format('m.s.SSS') });
  writeDB(`draw-heart-${heartCount}`, { clickData });
  if (heartCount === 50) {
    sendMail({ clientID, reason: '50heart'});
  }
  if (heartCount === 99) {
    setTimeout(() => {
      messengerEl.click();
    }, 500);
    setTimeout(() => {
      const listHearts = document.getElementsByTagName('img');
      for (let i = 0; i < listHearts.length; i++) {
        const element = listHearts[i];
        if (element.src.includes('/images/heart.svg')) {
          setTimeout(() => {
            element.remove();
          }, 250);
        }
      }
      setTimeout(() => {
        heartCount = 0;
      }, 1000);
    }, 250);
  }
  const isConflictPosition = (rL, rT, size) => {
    const { left, width, top, height } = typingImgPosition;

    let isXConflict = false;
    let isYConflict = false;
    if (
      (rL > left && rL < left + width) ||
      (rL + size > left && rL + size < left + width)
    ) {
      isXConflict = true;
    }
    if (rL <= left && rL + size >= left + width) {
      isXConflict = true;
    }
    if (
      (rT > top && rT < top + height) ||
      (rT + size > top && rT + size < top + height)
    ) {
      isYConflict = true;
    }
    if (rT <= top && rT + size >= top + height) {
      isYConflict = true;
    }
    return isXConflict && isYConflict;
  };
  const negativeValue = Math.random() < 0.5 ? -1 : 1;
  const randomAngle = Math.floor(Math.random() * 46) * negativeValue;

  const sizeArr = [50, 60, 70, 80, 90, 100];
  const randomOpacity = Math.floor(Math.random() * (10 - 3 + 1) + 3) / 10;

  let randomSize;
  let randomLeft;
  let randomTop;

  const randomFunc = () => {
    randomSize = sizeArr[Math.floor(Math.random() * 6)];

    randomLeft = Math.floor(Math.random() * window.innerWidth);
    randomTop = Math.floor(Math.random() * window.innerHeight);
    if (randomLeft + randomSize >= window.innerWidth - 10) {
      randomLeft = -10;
    }
    if (randomTop + randomSize >= window.innerHeight - 10) {
      randomTop = -10;
    }
  };
  randomFunc();

  while (
    isConflictPosition(
      randomLeft,
      randomTop,
      randomSize + (randomSize * Math.abs(randomAngle)) / 100
    )
  ) {
    randomFunc();
  }

  const heart = document.createElement("img");
  heart.src = "/images/heart.svg";
  heart.width = randomSize;
  heart.style.opacity = randomOpacity;
  heart.style.transform = `rotate(${randomAngle}deg)`;
  heart.style.position = "absolute";
  heart.style.top = `${randomTop}px`;
  heart.style.left = `${randomLeft}px`;
  heart.style.zIndex = 2;

  document.body.append(heart);
}
