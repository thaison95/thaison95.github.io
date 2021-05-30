const levelTime = [3.5, 3 + 25 / 60, 3 + 20 / 60];
const md = new MobileDetect(window.navigator.userAgent);
const randomColors = [
  '#dc3545',
  '#198754',
  '#ffc107',
  '#31d2f2',
  '#212529',
  'transparent',
  'transparent',
];

let clickData = [];
let imgPosition = 0;
var snapShotSize = 0;

var clientID = 'Others_' + dayjs().format('DD_MM_HH_mm');
generateClientID();
console.log(clientID);

handleSnapshotSize();

const writeDB = _.debounce(async (doc, data) => {
  console.log(data);
  if (!db) return;
  const dateTime = dayjs().format('DD.MM-HH.mm.ss');
  snapShotSize++;
  if (+snapShotSize > 200) {
    generateClientID(true);
    snapShotSize = 0;
  }
  if (+snapShotSize < 10) snapShotSize = '00' + snapShotSize;
  if (+snapShotSize < 100 && +snapShotSize >= 10) snapShotSize = '0' + snapShotSize;
  await db.collection(clientID).doc(snapShotSize + '_' + dateTime + '-' + doc).set({ ...data });
  clickData = [];
  localStorage.setItem('snap-size', snapShotSize);
}, 800);

window.addEventListener("load", () => {
  if (isSleepTime) return;

  document.getElementById('container').style.display = "block";

  imgPosition = window.innerWidth / 2 - 60;
  document.getElementById('meo').style.left = `${imgPosition}px`;

  let isLoaded = loadCachedTime();
  if (isLoaded) {
    calculateTime();
  } else {
    const dateTime = dayjs();
    document.querySelector("#hour").value = dateTime.hour();
    document.querySelector("#minute").value = dateTime.minute();
  }
  writeDB('loaded', { userAgent: md.ua, loadFromCache: isLoaded });
});

function calculateTime() {
  const hour = document.querySelector("#hour");
  const minute = document.querySelector("#minute");
  const levelEl = document.querySelector("#level");
  const displayEl = document.querySelector('#display');

  let level = levelTime[+levelEl.value];

  clickData.push({ inputHour: hour.value, inputMinute: minute.value, speed: dayjs().second() + '.' + dayjs().millisecond() });
  writeDB('click-ec-ec', { clickData });

  // const msg = validateInput(+hour.value, +minute.value);

  // if (msg) {
  //   // showMsg(msg);
  //   displayEl.innerHTML = '';
  //   return;
  // }

  cacheTime(hour.value, minute.value, levelEl.value);
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
          <button type="button" class="btn btn-danger btn-sm" style="margin-right: 10px" onclick="btnClick('minus', '${timeToFeed.format('HH:mm')}')">-</button>
            <span>${timeToFeed.format('HH:mm')}</span>
          <button type="button" class="btn btn-success btn-sm" style="margin-left: 10px" onclick="btnClick('plus', '${timeToFeed.format('HH:mm')}')">+</button>
        </li>
      `;
    }
  }
  displayEl.innerHTML = liEl;
}

function btnClick(type, time) {
  clickData.push({ value: time, type, speed: dayjs().second() + '.' + dayjs().millisecond() });
  writeDB('click+-', { clickData });
  document.getElementById('meo').style.display = 'block';
  document.getElementById('display').style.marginTop = '80px';
  if (type === 'plus' && imgPosition + 140 <= window.innerWidth) {
    imgPosition += 15;
  }
  if (type === 'minus' && imgPosition >= 15) {
    imgPosition -= 15;
  }
  document.getElementById('meo').style.left = `${imgPosition}px`;
  const overlayColor = Math.floor(Math.random() * randomColors.length);
  document.getElementById('meo').style.background = randomColors[overlayColor];
  if (randomColors[overlayColor] === 'transparent') {
    document.getElementById('meo-img').style.opacity = 1;
  } else {
    document.getElementById('meo-img').style.opacity = 0.5;
  }
}

function showMsg(msg, is2nd) {
  let msgEl = document.getElementById('msg');
  if (is2nd) {
    msgEl = document.getElementById('msg2');
  }
  msgEl.textContent = msg;
}

function onMeoClick() {
  clickData.push({ speed: dayjs().second() + '.' + dayjs().millisecond() });
  writeDB('click-meo', { clickData });
}
