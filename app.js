const levelTime = [3.5, 3 + 25 / 60];
const md = new MobileDetect(window.navigator.userAgent);

let clickCount = 0;
let imgPosition = 0;

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

  imgPosition = window.innerWidth / 2 - 60;
  document.getElementById('meo').style.left = `${imgPosition}px`;

  const time = dayjs();
  if ((time.hour() === 23 && time.minute() >= 55) || (time.hour() === 0 && time.minute() <= 30)) {
    writeDB('seen', { time: time.format('DD.MM-HH.mm.ss') });
    document.getElementById('container').style = "display: none";
    showMsg('12h rồi đấy. Sao e lại tiếp tục mở app vào giờ này?');
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
  clickCount++;
  if (clickCount >= 2) {
    showMsg('Anh biết ngày nào e cũng mở app lên nhưng ko phải để tính giờ. Có đúng ko?'); // clear msg
    showMsg('Em có thể để lại tin nhắn cho a ở phía dưới', true);
    document.getElementById('text-area').style = "display: block";
  } else {
    showMsg('Anh biết ngày nào e cũng mở app lên nhưng ko phải để tính giờ. Có đúng ko?'); // clear msg
  }

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
  // showMsg('Buồn quá. Ko làm nữa..');
  document.getElementById('meo').style.display = 'block';
  document.getElementById('display').style.marginTop = '80px';
  if (type === 'plus' && imgPosition + 140 <= window.innerWidth) {
    imgPosition += 15;
  }
  if (type === 'minus' && imgPosition >= 15) {
    imgPosition -= 15;
  }
  document.getElementById('meo').style.left = `${imgPosition}px`;
}

function showMsg(msg, is2nd) {
  let msgEl = document.getElementById('msg');
  if (is2nd) {
    msgEl = document.getElementById('msg2');
  }
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