var isSleepTime = false;
let sleepClickCount = 0;

const time = dayjs();
if (time.hour() === 23 || time.hour() < 4) {
  isSleepTime = true;
}

let seen = localStorage.getItem("seen");

window.addEventListener("load", () => {
  if (!isSleepTime) return;
  writeDB("loaded", { msg: "sleep" });

  document.getElementById("container").style.display = "none";
  document.getElementById("sleep").style.display = "block";
  document.getElementById("msg").style.marginTop = "0";

  let touchTimeStart;
  const startTouchHeo = (event) => {
    event.returnValue = false;
    document.getElementById("noti").style.display = "block";
    touchTimeStart = Date.now();
  }

  const endTouchHeo = () => {
    setTimeout(() => {
      document.getElementById("noti").style.display = "none";
    }, 250);
    writeDB("sleep-hold", { time: Date.now() - touchTimeStart });
    holdTimer = 0;
  }

  let div1 = document.querySelector("#sleep");
  div1.addEventListener("touchstart", startTouchHeo);
  div1.addEventListener("touchend", endTouchHeo);

  seen = seen === "true";
});

function onSleepClick() {
  writeDB("click-sleep-" + sleepClickCount, { count: sleepClickCount });
  switch (sleepClickCount) {
    case 0:
      if (!seen) {
        showMsg("Ngủ đi. Anh lock app từ 11h tới 4h rồi.");
      } else {
        showMsg("Ngủ đi. Cái kia chỉ đọc đc 1 lần thôi.");
      }
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
