var isSleepTime = false;
let sleepClickCount = 0;

const time = dayjs();
if (time.hour() === 23 || time.hour() < 4) {
  isSleepTime = true;
}

const notiImg = [
  '/images/z2472390568329_8a1efc734df3bdbc4bc249ed6bd5a371.jpg',
  '/images/z2478125267574_fd93713f093341f6b5d486ab8c0b5a9f.jpg',
  '/images/z2478125270017_c9adbecc798f7de6d3faad2815100b8c.jpg'
];

window.addEventListener("load", () => {
  if (!isSleepTime) return;
  writeDB("loaded", { msg: "sleep" });

  document.getElementById("container").style.display = "none";
  document.getElementById("sleep").style.display = "block";
  document.getElementById("msg").style.marginTop = "0";

  let touchTimeStart;
  const startTouchHeo = (event) => {
    event.returnValue = false;
    document.getElementById("noti").src = notiImg[Math.floor(Math.random() * 3)];
    document.getElementById("noti").style.display = "block";
    showMsg('Bỏ hình e vô là app xinh gòi');
    touchTimeStart = Date.now();
  }

  const endTouchHeo = () => {
    setTimeout(() => {
      document.getElementById("noti").style.display = "none";
      showMsg('');
    }, 250);
    writeDB("sleep-hold", { time: Date.now() - touchTimeStart });
    holdTimer = 0;
  }

  let div1 = document.querySelector("#sleep");
  div1.addEventListener("touchstart", startTouchHeo);
  div1.addEventListener("touchend", endTouchHeo);
});

function onSleepClick() {
  writeDB("click-sleep-" + sleepClickCount, { count: sleepClickCount });
  switch (sleepClickCount) {
    case 0:
      showMsg("Ngủ đi. Anh lock app từ 11h tới 4h rồi.");
      break;
    case 1:
      showMsg("Đừng nhấn nữa.");
      break;
    case 2:
      showMsg("Đã bảo đừng nhấn nữa gòi.");
      break;
    case 3:
      showMsg("Lì ghê.");
      break;
    case 4:
      showMsg("");
      document.getElementById("sleepImg").style.display = "none";
      document.getElementById("typingImg").style.display = "inline";
      break;
  }
  sleepClickCount++;
}

function onTypingClick() {
  showMsg("");
  document.getElementById("sleepImg").style.display = "inline";
  document.getElementById("typingImg").style.display = "none";
}
