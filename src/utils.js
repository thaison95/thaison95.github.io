function generateClientID(overSize) {
  if (overSize) {
    clientID = clientID.substr(0, clientID.length - 5) + dayjs().format('DD_MM');
    localStorage.setItem('client-id', clientID);
    return;
  }
  if (md.is('iPhone')) {
    clientID = 'ip_' + md.version('iOS') + '_' + dayjs().format('DD_MM');
  }
  
  if (localStorage.getItem('client-id')) {
    clientID = localStorage.getItem('client-id');
  } else {
    localStorage.setItem('client-id', clientID);
  }
}

function handleSnapshotSize() {
  if (localStorage.getItem('snap-size')) {
    snapShotSize = localStorage.getItem('snap-size');
  } else {
    localStorage.setItem('snap-size', 0);
  }
}

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