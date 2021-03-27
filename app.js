const levelTime = [3.5, 3 + 25 / 60];
const md = new MobileDetect(window.navigator.userAgent);

var clientID = 'Others_' + dayjs().format('DD_MM_HH_mm');

if (md.is('iPhone')) {
  clientID = 'ip_' + md.version('iOS') + '_' + dayjs().format('DD_MM');
}

if (localStorage.getItem('client-id')) {
  clientID = localStorage.getItem('client-id');
} else {
  localStorage.setItem('client-id', clientID);
}

function writeDB(doc, data) {
  const dateTime = dayjs().format('DD.MM-HH.mm.ss');
  db.collection(clientID).doc(dateTime + '-' + doc).set(data);
}

window.addEventListener("load", () => {
  writeDB('loaded', { userAgent: md.ua });
  const time = dayjs();
  if ((time.hour() === 23 && time.minute() >= 55) || (time.hour() === 0 && time.minute() <= 59)) {
    writeDB('seen', { time: time.format('DD.MM-HH.mm.ss') });
    document.getElementById('container').style = "display: none";
    showMsg('12h rồi đấy. Sao e lại tiếp tục mở app vào giờ này? Anh biết e thường xuyên mở app vào giờ này và ko phải để tính giờ. Có đúng ko? Tin nhắn này a cài sẵn để nếu e mở app vào thời điểm 23h55 -> 00h59 thì sẽ hiện lên, e đọc được rồi thì hôm sau sẽ ko hiện lại nữa đâu. Em có thể để lại tin nhắn cho a ở phía dưới');
    document.getElementById('text-area').style = "display: block";
  }
});

function validateInput(hour, minute) {
  if (hour > 23 || minute > 59 || !hour || !minute) {
    return 'Em định thử anh đấy à?';
  }
  if (hour >= 20 && hour < 24) {
    return 'Giờ này tính giờ để làm gì?';
  }
  if (hour === 3) {
    return 'Ngủ đi em. Giờ này dậy làm gì?'
  }
  if (hour >=0 && hour < 3) {
    return 'Sao giờ này còn thức?'
  }
}

function calculateTime() {
  const hour = document.querySelector("#hour");
  const minute = document.querySelector("#minute");
  const levelEl = document.querySelector("#level");
  const displayEl = document.querySelector('#display');

  let level = levelTime[+levelEl.value];

  writeDB('click-ec-ec', { inputHour: hour.value, inputMinute: minute.value, levelSelect: levelEl.value });
  showMsg('Sao em unblock a rồi?'); // clear msg

  const msg = validateInput(+hour.value, +minute.value);

  if (msg) {
    // showMsg(msg);
    displayEl.innerHTML = '';
    return;
  }

  let timeToFeed = dayjs().hour(hour.value).minute(minute.value);

  const ul = document.createElement("ul");
  ul.id = 'display';
  let i = 0;
  let liEl = ``;
  while (i < 10) {
    i++;
    timeToFeed = timeToFeed.add(level, 'hour');
    if (timeToFeed.isBefore(dayjs().hour(23).minute(55))) {
      if (i > 1) {
        timeToFeed = timeToFeed.add(1, 'minute');
      };
      liEl += `
        <li>
          <button style="margin-right: 10px" onclick="btnClick('minus', '${timeToFeed.format('HH:mm')}')">-</button>
            ${timeToFeed.format('HH:mm')}
          <button style="margin-left: 10px" onclick="btnClick('plus', '${timeToFeed.format('HH:mm')}')">+</button>
        </li>
      `;
    }
  }
  displayEl.innerHTML = liEl;
}

function btnClick(type, time) {
  writeDB('click-' + type, { value: time });
  showMsg('Buồn quá. Ko làm nữa..');
}

function showMsg(msg) {
  const msgEl = document.getElementById('msg');
  msgEl.textContent = msg;
}

function sendMsg() {
  const msg = document.querySelector('#getMsg');
  if (!msg.value || msg.value === 'em chưa nhập gì mà ಠ_ಠ') {
    msg.value = 'em chưa nhập gì mà ಠ_ಠ';
  } else {
    writeDB('message', { value: msg.value });
    msg.value = '';
  }
}