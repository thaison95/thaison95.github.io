window.addEventListener("load", () => {
  const minuteEl = document.querySelector('#minute');
  for (let i = 1; i < 60; i++) {
    const option = document.createElement('option');
    option.textContent = i.toLocaleString('en-US', {minimumIntegerDigits: 2});
    minuteEl.append(option);
  }
  
});

function calculateTime() {
  const hour = document.querySelector("#hour");
  const minute = document.querySelector("#minute");
  const levelEl = document.querySelector("#level");

  let level = 3 + 35 / 60;
  if (levelEl.value == 12) {
    level = 3.5;
  }

  let timeToFeed = dayjs().hour(hour.value).minute(minute.value);

  const ul = document.createElement("ul");
  ul.id = 'display';
  let i = 0;
  while (i < 10) {
    i++;
    const li = document.createElement("li");
    timeToFeed = timeToFeed.add(level, 'hour');
    if (timeToFeed.isBefore(dayjs().hour(23).minute(55))) {
      if (i > 1) {
        timeToFeed = timeToFeed.add(1, 'minute');
      };
      li.textContent = timeToFeed.format('HH:mm');
      ul.append(li);
    }
  }
  const displayEl = document.querySelector('#display');
  displayEl.replaceWith(ul);
}
