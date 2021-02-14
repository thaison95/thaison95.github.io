function showLog(log) {
  let logPanel = document.querySelector('#log');
  var li = document.createElement("li");
  li.textContent = log;
  logPanel.append(li);
}

window.addEventListener("load", () => {
  const base = document.querySelector("base");
  let baseUrl = (base && base.href) || "";

  if (!baseUrl.endsWith("/")) {
    baseUrl = `${baseUrl}/`;
  }
  showLog(navigator.serviceWorker);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(`${baseUrl}sw.js`)
      .then((registration) => {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
        showLog("ServiceWorker registration successful with scope: ");
      })
      .catch((err) => {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
        showLog("ServiceWorker registration failed: ");
      });
  }
});

const displayConfirmNotification = () => {
  console.log("displayConfirmNotification !!!");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((sw) =>
      sw.showNotification("Successfully subscribed (from SW)!")
    );
  }
};

if ("Notification" in window) {
  Notification.requestPermission((result) => {
    console.log("User Choice", result);
    if (result !== "granted") {
      console.log("No notification permission granted!");
    } else {
      console.log("Notification permission granted!");
      // displayConfirmNotification();
    }
  });
}

function onPush() {
  console.log('push push');
  showLog(window.Notification);
  // navigator.serviceWorker.ready.then((sw) =>
  //     sw.showNotification("ec ec")
  //   );
}