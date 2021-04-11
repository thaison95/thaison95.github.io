var cachedTime = localStorage.getItem('cachedTime');

const curDate = dayjs().format('DD/MM');

function cacheTime(hour, minute, level) {
  localStorage.setItem('cachedTime', curDate + '_' + hour + ':' + minute + '_' + level);
}

function loadCachedTime() {
  if (!cachedTime) return;
  
  const [date, time, level] = cachedTime.split('_');
  if (date !== curDate) {
    localStorage.removeItem('cachedTime');
    return false;
  }

  const [hour, minute] = time.split(':');

  document.querySelector("#hour").value = hour;
  document.querySelector("#minute").value = minute;
  document.querySelector("#level").value = level;

  return true;
}