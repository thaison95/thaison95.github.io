var isSleepTime = false;
let sleepClickCount = 0;

const time = dayjs();
if (time.hour() === 23 || time.hour() < 4) {
  isSleepTime = true;
}

window.addEventListener("load", () => {
  if (!isSleepTime) return;
  writeDB('loaded', { msg: 'sleep' });

  document.getElementById('container').style.display = "none";
  document.getElementById('sleep').style.display = "block";
  document.getElementById('msg').style.marginTop = "0";
});

function onSleepClick() {
  writeDB('click-sleep-' + sleepClickCount, { count: sleepClickCount });
  switch (sleepClickCount) {
    case 0:
      showMsg('Ngủ đi. Anh lock app từ 11h tới 4h rồi.');
      break;
    case 1:
      showMsg('Đừng nhấn nữa.');
      break;
    case 2:
      showMsg('Đã bảo đừng nhấn nữa gòi.');
      break;
    case 3:
      showMsg('Lì ghê.');
      break;
    case 4:
      showMsg('');
      document.getElementById('sleepImg').style.display = "none";
      document.getElementById('typingImg').style.display = "inline";
      break;
  }
  sleepClickCount++;
}

function onTypingClick() {
  document.getElementById('sleepImg').style.display = "inline";
  document.getElementById('typingImg').style.display = "none";
}