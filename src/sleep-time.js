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

  seen = seen === "true";
});

function onSleepClick() {
  writeDB("click-sleep-" + sleepClickCount, { count: sleepClickCount });
  if (((time.hour() === 23 && time.minute() >= 45) || time.hour() < 4) && !seen) {
    switch (sleepClickCount) {
      case 0:
        showMsg("Nếu em đọc được cái này thì");
        break;
      case 1:
        showMsg("Anh chỉ muốn nói là");
        break;
      case 2:
        showMsg("Anh");
        break;
      case 3:
        showMsg("muốn");
        break;
      case 4:
        showMsg("gặp");
        break;
      case 5:
        showMsg("em");
        break;
      case 6:
        showMsg("ở");
        break;
      case 7:
        showMsg("kon tum");
        break;
      case 8:
        showMsg("thôi");
        break;
      case 9:
        showMsg("Ngủ đi.");
        document.getElementById("sleepImg").style.display = "none";
        document.getElementById("typingImg").style.display = "inline";
        localStorage.setItem('seen', true);
        writeDB("click-sleep-seen" + sleepClickCount, { count: sleepClickCount });
        break;
    }
    sleepClickCount++;
    return;
  }
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
