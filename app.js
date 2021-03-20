window.addEventListener("load", () => {
  // e
});

function validateInput(hour, minute) {
  if (hour > 23 || minute > 59) {
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

  let level = 3 + 35 / 60;
  if (levelEl.value == 12) {
    level = 3.5;
  }

  const msg = validateInput(parseInt(hour.value), parseInt(minute.value));

  if (msg) {
    showMsg(msg);
    displayEl.innerHTML = '';
    return;
  }
  showMsg(''); // clear msg
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
          <button style="margin-right: 10px" onclick="showMsg('Này đang làm. Chưa xong!')">-</button>${timeToFeed.format('HH:mm')}<button style="margin-left: 10px" onclick="showMsg('Này đang làm. Chưa xong!')">+</button>
        </li>
      `;
    }
  }
  displayEl.innerHTML = liEl;
}

function showMsg(msg) {
  const msgEl = document.getElementById('msg');
  msgEl.textContent = msg;
}
