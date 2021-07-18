var isSleepTime = true;
let sleepClickCount = 0;

const time = dayjs();
if (time.hour() === 23 || time.hour() < 4) {
  isSleepTime = true;
}

const notiImg = [
  '/images/214982424_186656280168019_1285288534884714558_n.jpg',
  '/images/189239174_521853969048884_7359803088458713595_n.jpg',
  '/images/z2472390568329_8a1efc734df3bdbc4bc249ed6bd5a371.jpg',
  '/images/z2478125267574_fd93713f093341f6b5d486ab8c0b5a9f.jpg',
  '/images/z2478125270017_c9adbecc798f7de6d3faad2815100b8c.jpg'
];

function sleepInit() {
  writeDB("loaded", { msg: "sleep" });

  document.getElementById("container").style.display = "none";
  document.getElementById("sleep").style.display = "block";
  document.getElementById("display").innerHTML = "";
  document.getElementById('meo').style.display = "none";
  document.getElementById("msg").style.marginTop = "0";

  let touchTimeStart;
  const startTouchHeo = (event) => {
    event.returnValue = false;
    document.getElementById("noti").src = notiImg[0];
    document.getElementById("noti").style.display = "block";
    // showMsg('Tuần trước ngày nào cũng gặp xong giờ tốn nhiều ca-lo ghê 🥵');
    const lastMsg = document.getElementById('msg').innerText;
    if (lastMsg.length < 6) showMsg(lastMsg + '🍀');
    touchTimeStart = Date.now();
  }

  const endTouchHeo = () => {
    setTimeout(() => {
      document.getElementById("noti").style.display = "none";
    }, 250);
    clickData.push({ holdTime: Date.now() - touchTimeStart, speed: dayjs().second() + '.' + dayjs().millisecond() });
    writeDB(`sleep-${Date.now() - touchTimeStart}`, { clickData });
    holdTimer = 0;
  }

  let div1 = document.querySelector("#sleep");
  div1.addEventListener("touchstart", startTouchHeo);
  div1.addEventListener("touchend", endTouchHeo);
}

window.addEventListener("load", () => {
  if (!isSleepTime) return;
  isLoadBeforeSleep = false;
  
  sleepInit();
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
  clickData.push({ value: 'SLEEP HEOOOOOOOOOO' });
  writeDB("sleep-heo", { sleepHeo: true });
  // showMsg("Hay chưa :)) Tính năng ẩn chứ ko phải bug nha", true);
  document.getElementById("sleepImg").style.display = "inline";
  document.getElementById("typingImg").style.display = "none";
}
