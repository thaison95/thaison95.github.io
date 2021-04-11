var cachedTime = localStorage.getItem('cachedTime');

const curDate = dayjs().format('DD/MM');

function cacheTime(hour, minute, level) {
  localStorage.setItem('cachedTime', curDate + '_' + hour + ':' + minute + '_' + level);
}

function loadCachedTime() {
  if (!cachedTime) return false;
  
  const [date, time, level] = cachedTime.split('_');
  if (date !== curDate) {
    localStorage.removeItem('cachedTime');
    return false;
  }

  const [hour, minute] = time.split(':');

  document.querySelector("#hour").value = hour || 0;
  document.querySelector("#minute").value = minute || 0;
  document.querySelector("#level").value = level || 0;

  return true;
}