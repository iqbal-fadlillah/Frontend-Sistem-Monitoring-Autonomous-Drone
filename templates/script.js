import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  child,
  push,
  get,
  onValue,
  query,
  limitToFirst,
  limitToLast,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

import {
  getStorage,
  getDownloadURL,
  ref as re,
  uploadString,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

const firebaseConfig1 = {
  apiKey: "AIzaSyCFtkJaUFOnhjnBoAy1MohoPvS02U6zItI",

  authDomain: "dronev2-b91f3.firebaseapp.com",

  databaseURL:
    "https://dronev2-b91f3-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "dronev2-b91f3",

  storageBucket: "dronev2-b91f3.appspot.com",

  messagingSenderId: "940590245252",

  appId: "1:940590245252:web:66e4424f047e203cd469d1",
};

// Initialize Firebase\
const app = initializeApp(firebaseConfig1);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
const storage = getStorage();

// Time Stamp
const d = new Date();
let hours = d.getHours();
let minutes = d.getMinutes();
let seconds = d.getSeconds();
let ms = d.getMilliseconds();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = months[d.getMonth()];
let date = d.getDate();
let day = days[d.getDay()];
let year = d.getFullYear();

// File Name
let baseFileAltitude = "Altitude";
let baseFileGroundSpeed = "Ground Speed";
let baseFileWindSpeed = "Wind Speed";
let baseFileBattery = "Battery";
let baseFileLatitude = "Latitude";
let baseFileLongitude = "Longitude";
let baseFileWaterVolume = "Water Volume";
let baseFileSprayingPower = "Spraying Power";

const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
const tanggal = `${date} ${month} ${year}`;
// console.log(saveTimeStamp);

// Image Reference
const imageRefAlt = re(
  storage,
  `Images/Altitude/ ${baseFileAltitude} ${saveTimeStamp}`
);

const imageRefGs = re(
  storage,
  `Images/Ground Speed/ ${baseFileGroundSpeed} ${saveTimeStamp}`
);

const imageRefWindSpeed = re(
  storage,
  `Images/Wind Speed/ ${baseFileWindSpeed} ${saveTimeStamp}`
);

const imageRefBattery = re(
  storage,
  `Images/Battery/ ${baseFileBattery} ${saveTimeStamp}`
);

const imageRefLatitude = re(
  storage,
  `Images/Latitude/ ${baseFileLatitude} ${saveTimeStamp}`
);

const imageRefLongitude = re(
  storage,
  `Images/Longitude/ ${baseFileLongitude} ${saveTimeStamp}`
);

const imageRefWaterVolume = re(
  storage,
  `Images/Water Volume/ ${baseFileWaterVolume} ${saveTimeStamp}`
);

const imageRefSpraying = re(
  storage,
  `Images/Spraying Power/ ${baseFileSprayingPower} ${saveTimeStamp}`
);

// some HTML element on the page
const altitude = document.getElementById("postElement1");
const groundSpeed = document.getElementById("postElement2");
const windSpeed = document.getElementById("postElement3");
const teganganBaterai = document.getElementById("postElement4");
const latitude = document.getElementById("postElement5");
const longitude = document.getElementById("postElement6");
const volumeAir = document.getElementById("postElement7");
const powerPenyiraman = document.getElementById("postElement8");
const kondisiDrone = document.getElementById("kondisiTerbang1");

const labels = [];
const labels_ground_speed = [];
const labels_wind_speed = [];
const labels_tegangan_baterai = [];
const labels_latitude = [];
const labels_longitude = [];
const labels_volume_air = [];
const labels_power_penyiraman = [];

const data_altitude = {
  labels: labels,
  datasets: [
    {
      label: "Altitude",
      backgroundColor: "rgb(255, 0, 0)",
      borderColor: "rgb(255, 0, 0)",
      data: [],
    },
  ],
  options: {
    animation: {
      onComplete: function () {
        console.log(myChart1.toBase64Image());
      },
    },
  },
};

const data_groundspeed = {
  labels: labels_ground_speed,
  datasets: [
    {
      label: "Ground Speed",
      backgroundColor: "rgb(10, 255, 132)",
      borderColor: "rgb(10, 255, 132)",
      data: [],
    },
  ],
};

const data_windspeed = {
  labels: labels_wind_speed,
  datasets: [
    {
      label: "Wind Speed",
      backgroundColor: "rgb(255, 255, 50)",
      borderColor: "rgb(255, 255, 50)",
      data: [],
    },
  ],
};

const data_tegangan = {
  labels: labels_tegangan_baterai,
  datasets: [
    {
      label: "Battery Volt",
      backgroundColor: "rgb(255, 90, 10)",
      borderColor: "rgb(255, 90, 10)",
      data: [],
    },
  ],
};

const data_latitude = {
  labels: labels_latitude,
  datasets: [
    {
      label: "Latitude",
      backgroundColor: "rgb(10, 200, 255)",
      borderColor: "rgb(10, 200, 255)",
      data: [],
    },
  ],
};

const data_longitude = {
  labels: labels_longitude,
  datasets: [
    {
      label: "Longitude",
      backgroundColor: "rgb(0, 100, 255)",
      borderColor: "rgb(0, 100, 255)",
      data: [],
    },
  ],
};

const data_volumeair = {
  labels: labels_volume_air,
  datasets: [
    {
      label: "Water Volume",
      backgroundColor: "rgb(200, 00, 255)",
      borderColor: "rgb(200, 00, 255)",
      data: [],
    },
  ],
};

const data_penyiraman = {
  labels: labels_power_penyiraman,
  datasets: [
    {
      label: "Spraying Power",
      backgroundColor: "rgb(255, 0, 132)",
      borderColor: "rgb(255, 0, 132)",
      data: [],
    },
  ],
};

var nALt = -1;
function incrementAlt() {
  nALt++;
  return nALt;
}
var nGs = -1;
function incrementGroudSpeed() {
  nGs++;
  return nGs;
}
var nWs = -1;
function incrementWindSpeed() {
  nWs++;
  return nWs;
}
var nBattery = -1;
function incrementBatt() {
  nBattery++;
  return nBattery;
}
var nLat = -1;
function incrementLat() {
  nLat++;
  return nLat;
}
var nLong = -1;
function incrementLong() {
  nLong++;
  return nLong;
}
var nVol = -1;
function incrementVol() {
  nVol++;
  return nVol;
}
var nSpray = -1;
function incrementSpray() {
  nSpray++;
  return nSpray;
}

const config1 = {
  type: "line",
  data: data_altitude,
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "Meter",
        },
      },
      x: {
        ticks: {
          autoskip: false,
        },
        title: {
          display: true,
          text: "n-Data",
        },
      },
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
  },
};

const config2 = {
  type: "line",
  data: data_groundspeed,
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "M/s",
        },
      },
      x: {
        ticks: {
          autoskip: false,
        },
        title: {
          display: true,
          text: "n-Data",
        },
      },
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
  },
};

const config3 = {
  type: "line",
  data: data_latitude,
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "Degree",
        },
      },
      x: {
        ticks: {
          autoskip: false,
        },
        title: {
          display: true,
          text: "n-Data",
        },
      },
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
  },
};

const config4 = {
  type: "line",
  data: data_longitude,
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "Degree",
        },
      },
      x: {
        ticks: {
          autoskip: false,
        },
        title: {
          display: true,
          text: "n-Data",
        },
      },
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
  },
};

const config5 = {
  type: "line",
  data: data_windspeed,
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "M/s",
        },
      },
      x: {
        ticks: {
          autoskip: false,
        },
        title: {
          display: true,
          text: "n-Data",
        },
      },
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
  },
};

const config6 = {
  type: "line",
  data: data_tegangan,
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "Volt",
        },
      },
      x: {
        ticks: {
          autoskip: false,
        },
        title: {
          display: true,
          text: "n-Data",
        },
      },
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
  },
};

const config7 = {
  type: "line",
  data: data_volumeair,
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "ml/s",
        },
      },
      x: {
        ticks: {
          autoskip: false,
        },
        title: {
          display: true,
          text: "n-Data",
        },
      },
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
  },
};

const config8 = {
  type: "line",
  data: data_penyiraman,
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "Spraying Power (Percent)",
        },
      },
      x: {
        ticks: {
          autoskip: false,
        },
        title: {
          display: true,
          text: "n-Data",
        },
      },
    },
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
  },
};

const myChart1 = new Chart(document.getElementById("myChart1"), config1);
const myChart2 = new Chart(document.getElementById("myChart2"), config2);
const myChart3 = new Chart(document.getElementById("myChart3"), config3);
const myChart4 = new Chart(document.getElementById("myChart4"), config4);
const myChart5 = new Chart(document.getElementById("myChart5"), config5);
const myChart6 = new Chart(document.getElementById("myChart6"), config6);
const myChart7 = new Chart(document.getElementById("myChart7"), config7);
const myChart8 = new Chart(document.getElementById("myChart8"), config8);

document.getElementById("upload-graph").onclick = function () {
  var gambarAltitude;
  var fileNameAltitude;
  gambarAltitude = myChart1.toBase64Image();
  fileNameAltitude = `Grafik Altitude ${d}.png`;
  // Upload to Storage
  uploadString(imageRefAlt, gambarAltitude, "data_url").then((snapshot) => {
    console.log("Uploaded a Altitude!");
  });
  // Push URL to Realtime Database
  setTimeout(function () {
    getDownloadURL(
      re(storage, `Images/Altitude/ ${baseFileAltitude} ${saveTimeStamp}`)
    ).then((url) => {
      console.log(url);
      push(ref(db, `Grafik`), {
        ImageName: fileNameAltitude,
        ImageUrl: url,
        Tanggal: tanggal,
        Jenis: "Altitude",
      });
    });
  }, 3000);

  var gambarGs;
  var fileNameGs;
  gambarGs = myChart2.toBase64Image();
  fileNameGs = `Grafik Ground Speed ${d}.png`;
  // Upload to Storage
  uploadString(imageRefGs, gambarGs, "data_url").then((snapshot) => {
    console.log("Uploaded a Ground Speed!");
  });
  // Push URL to Realtime Database
  setTimeout(function () {
    getDownloadURL(
      re(
        storage,
        `Images/Ground Speed/ ${baseFileGroundSpeed} ${saveTimeStamp}`
      )
    ).then((url) => {
      console.log(url);
      push(ref(db, `Grafik`), {
        ImageName: fileNameGs,
        ImageUrl: url,
        Tanggal: tanggal,
        Jenis: "Ground Speed",
      });
    });
  }, 3000);

  var gambarWs;
  var fileNameWs;
  gambarWs = myChart5.toBase64Image();
  fileNameWs = `Grafik Wind Speed ${d}.png`;
  // Upload to Storage
  uploadString(imageRefWindSpeed, gambarWs, "data_url").then((snapshot) => {
    console.log("Uploaded a Wind Speed!");
  });
  // Push URL to Realtime Database
  setTimeout(function () {
    getDownloadURL(
      re(storage, `Images/Wind Speed/ ${baseFileWindSpeed} ${saveTimeStamp}`)
    ).then((url) => {
      console.log(url);
      push(ref(db, `Grafik`), {
        ImageName: fileNameWs,
        ImageUrl: url,
        Tanggal: tanggal,
        Jenis: "Wind Speed",
      });
    });
  }, 3000);

  var gambarBattery;
  var fileNameBatt;
  gambarBattery = myChart6.toBase64Image();
  fileNameBatt = `Grafik Battery ${d}.png`;
  // Upload to Storage
  uploadString(imageRefBattery, gambarBattery, "data_url").then((snapshot) => {
    console.log("Uploaded a Battery!");
  });
  // Push URL to Realtime Database
  setTimeout(function () {
    getDownloadURL(
      re(storage, `Images/Battery/ ${baseFileBattery} ${saveTimeStamp}`)
    ).then((url) => {
      console.log(url);
      push(ref(db, `Grafik`), {
        ImageName: fileNameBatt,
        ImageUrl: url,
        Tanggal: tanggal,
        Jenis: "Battery",
      });
    });
  }, 3000);

  var gambarLatitude;
  var fileNameLat;
  gambarLatitude = myChart3.toBase64Image();
  fileNameLat = `Grafik Latitude ${d}.png`;
  // Upload to Storage
  uploadString(imageRefLatitude, gambarLatitude, "data_url").then(
    (snapshot) => {
      console.log("Uploaded a Latitude!");
    }
  );
  // Push URL to Realtime Database
  setTimeout(function () {
    getDownloadURL(
      re(storage, `Images/Latitude/ ${baseFileLatitude} ${saveTimeStamp}`)
    ).then((url) => {
      console.log(url);
      push(ref(db, `Grafik`), {
        ImageName: fileNameLat,
        ImageUrl: url,
        Tanggal: tanggal,
        Jenis: "Latitude",
      });
    });
  }, 3000);

  var gambarLongitude;
  var fileNameLon;
  gambarLongitude = myChart4.toBase64Image();
  fileNameLon = `Grafik Longitude ${d}.png`;
  // Upload to Storage
  uploadString(imageRefLongitude, gambarLongitude, "data_url").then(
    (snapshot) => {
      console.log("Uploaded a Longitude!");
    }
  );
  // Push URL to Realtime Database
  setTimeout(function () {
    getDownloadURL(
      re(storage, `Images/Longitude/ ${baseFileLongitude} ${saveTimeStamp}`)
    ).then((url) => {
      console.log(url);
      push(ref(db, `Grafik`), {
        ImageName: fileNameLon,
        ImageUrl: url,
        Tanggal: tanggal,
        Jenis: "Longitude",
      });
    });
  }, 3000);

  var gambarWater;
  var fileNameWater;
  gambarWater = myChart7.toBase64Image();
  fileNameWater = `Grafik Water Volume ${d}.png`;
  // Upload to Storage
  uploadString(imageRefWaterVolume, gambarWater, "data_url").then(
    (snapshot) => {
      console.log("Uploaded a Water Volume!");
    }
  );
  // Push URL to Realtime Database
  setTimeout(function () {
    getDownloadURL(
      re(
        storage,
        `Images/Water Volume/ ${baseFileWaterVolume} ${saveTimeStamp}`
      )
    ).then((url) => {
      console.log(url);
      push(ref(db, `Grafik`), {
        ImageName: fileNameWater,
        ImageUrl: url,
        Tanggal: tanggal,
        Jenis: "Water Volume",
      });
    });
  }, 3000);

  var gambarSpraying;
  var fileNameSpraying;
  gambarSpraying = myChart8.toBase64Image();
  fileNameSpraying = `Grafik Spraying Power ${d}.png`;
  // Upload to Storage
  uploadString(imageRefSpraying, gambarSpraying, "data_url").then(
    (snapshot) => {
      console.log("Uploaded a Spraying Power!");
    }
  );
  // Push URL to Realtime Database
  setTimeout(function () {
    getDownloadURL(
      re(
        storage,
        `Images/Spraying Power/ ${baseFileSprayingPower} ${saveTimeStamp}`
      )
    ).then((url) => {
      console.log(url);
      push(ref(db, `Grafik`), {
        ImageName: fileNameSpraying,
        ImageUrl: url,
        Tanggal: tanggal,
        Jenis: "Spraying Power",
      });
    });
  }, 3000);
};

var searchBtn = document.getElementById("find");
var resetBtn = document.getElementById("resetImg");
var startDate = document.getElementById("start-date");
var endDate = document.getElementById("end-date");
var listSearch = document.getElementById("list-search");
var canvas = document.getElementById("msg");
var context = canvas.getContext("2d");

function FindData() {
  const dbref = ref(db);
  var data = JSON.parse(localStorage.getItem("graphic"));
  var start = new Date(startDate.value);
  var end = new Date(endDate.value);
  start.setDate(start.getDate() - 1);
  var filteredData = data.filter(
    (el) => new Date(el.Tanggal) >= start && new Date(el.Tanggal) <= end
  );

  var altitude = document.getElementById("altitude").checked;
  var battery = document.getElementById("battery").checked;
  var wind = document.getElementById("wind").checked;
  var ground = document.getElementById("ground").checked;
  var water = document.getElementById("water").checked;
  var spraying = document.getElementById("spraying").checked;
  var latitude = document.getElementById("latitude").checked;
  var longitude = document.getElementById("longitude").checked;

  filteredData = filteredData.filter((el) => {
    var imageName = el.ImageName.toLowerCase();
    return (
      (imageName.includes("altitude") && altitude) ||
      (imageName.includes("battery") && battery) ||
      (imageName.includes("wind") && wind) ||
      (imageName.includes("ground") && ground) ||
      (imageName.includes("water") && water) ||
      (imageName.includes("spraying") && spraying) ||
      (imageName.includes("latitude") && latitude) ||
      (imageName.includes("longitude") && longitude)
    );
  });
  var htmlListSearch = filteredData.map(
    (el, i) => `
  <hr style="border: 1px solid grey;">
  <button id="list-data" class="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#${i}"
    aria-expanded="false" aria-controls="${i}">
    ${el.ImageName}</button>
  <div class="collapse img-result" id="${i}">
    <img src="${el.ImageUrl}" />
  </div>  
  `
  );
  listSearch.innerHTML = htmlListSearch.join(" ");
}

function resetImage() {
  listSearch.value = "";
}

document.getElementById("resetImg").onclick = () => {
  listSearch.innerHTML = "";
};

searchBtn.addEventListener("click", FindData);
resetBtn.addEventListener("click", resetImage);

document.getElementById("btn-download-1").onclick = function () {
  var a = document.createElement("a");
  a.href = myChart1.toBase64Image();
  a.download = `Grafik Altitude ${d}.png`;
  a.click();
};

document.getElementById("btn-download-2").onclick = function () {
  var a = document.createElement("a");
  a.href = myChart2.toBase64Image();
  a.download = `Grafik Ground Speed ${d}.png`;
  a.click();
};

document.getElementById("btn-download-3").onclick = function () {
  var a = document.createElement("a");
  a.href = myChart3.toBase64Image();
  a.download = `Grafik Latitude ${d}.png`;
  a.click();
};

document.getElementById("btn-download-4").onclick = function () {
  var a = document.createElement("a");
  a.href = myChart4.toBase64Image();
  a.download = `Grafik Longitude ${d}.png`;
  a.click();
};

document.getElementById("btn-download-5").onclick = function () {
  var a = document.createElement("a");
  a.href = myChart5.toBase64Image();
  a.download = `Grafik Wind Speed ${d}.png`;
  a.click();
};

document.getElementById("btn-download-6").onclick = function () {
  var a = document.createElement("a");
  a.href = myChart6.toBase64Image();
  a.download = `Grafik Battery Volt ${d}.png`;
  a.click();
};

document.getElementById("btn-download-7").onclick = function () {
  var a = document.createElement("a");
  a.href = myChart7.toBase64Image();
  a.download = `Grafik Water Volume ${d}.png`;
  a.click();
};

document.getElementById("btn-download-8").onclick = function () {
  var a = document.createElement("a");
  a.href = myChart8.toBase64Image();
  a.download = `Grafik Spraying Power ${d}.png`;
  a.click();
};

onValue(ref(db, "Kondisi (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  kondisiDrone.innerHTML = data.INFORMASI
});
onValue(ref(db, "Altitude (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
  myChart1.data.labels.push(incrementAlt());
  myChart1.data.datasets.forEach((dataset) => {
    dataset.data.push(data.Altitude);
    console.log(saveTimeStamp);
    if (dataset.data.length > 1000) {
      dataset.data.shift();
      myChart1.data.labels.shift();
    }
  });
  myChart1.update();
  push(ref(db, "Altitude Graph"), {
    Altitude: data.Altitude,
    Time: saveTimeStamp,
  });
  altitude.innerHTML = data.Altitude;
});

onValue(ref(db, "Ground Speed (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
  myChart2.data.labels.push(incrementGroudSpeed());
  myChart2.data.datasets.forEach((dataset) => {
    dataset.data.push(data.Ground_Speed);
    if (dataset.data.length > 1000) {
      dataset.data.shift();
      myChart2.data.labels.shift();
    }
  });
  myChart2.update();
  push(ref(db, "Ground Speed Graph"), {
    Ground_Speed: data.Ground_Speed,
    Time: saveTimeStamp,
  });
  groundSpeed.innerHTML = data.Ground_Speed;
});

onValue(ref(db, "Windspeed (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
  myChart5.data.labels.push(incrementWindSpeed());
  myChart5.data.datasets.forEach((dataset) => {
    dataset.data.push(data.Windspeed);
    if (dataset.data.length > 1000) {
      dataset.data.shift();
      myChart5.data.labels.shift();
    }
  });
  myChart5.update();
  push(ref(db, "Windspeed Graph"), {
    Wind_Speed: data.Windspeed,
    Time: saveTimeStamp,
  });
  windSpeed.innerHTML = data.Windspeed;
});

onValue(ref(db, "Battery (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
  myChart6.data.labels.push(incrementBatt());
  myChart6.data.datasets.forEach((dataset) => {
    dataset.data.push(data.Battery);
    if (dataset.data.length > 1000) {
      dataset.data.shift();
      myChart6.data.labels.shift();
    }
  });
  myChart6.update();
  push(ref(db, "Battery Graph"), {
    Battery: data.Battery,
    Time: saveTimeStamp,
  });
  teganganBaterai.innerHTML = data.Battery;
});

onValue(ref(db, "Latitude (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
  myChart3.data.labels.push(incrementLat());
  myChart3.data.datasets.forEach((dataset) => {
    dataset.data.push(data.Latitude);
    if (dataset.data.length > 1000) {
      dataset.data.shift();
      myChart3.data.labels.shift();
    }
  });
  myChart3.update();
  push(ref(db, "Latitude Graph"), {
    Latitude: data.Latitude,
    Time: saveTimeStamp,
  });
  latitude.innerHTML = data.Latitude;
});

onValue(ref(db, "Longitude (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
  myChart4.data.labels.push(incrementLong());
  myChart4.data.datasets.forEach((dataset) => {
    dataset.data.push(data.Longitude);
    if (dataset.data.length > 1000) {
      dataset.data.shift();
      myChart4.data.labels.shift();
    }
  });
  myChart4.update();
  push(ref(db, "Longitude Graph"), {
    Longitude: data.Longitude,
    Time: saveTimeStamp,
  });
  longitude.innerHTML = data.Longitude;
});

onValue(ref(db, "Volume Air (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
  myChart7.data.labels.push(incrementVol());
  myChart7.data.datasets.forEach((dataset) => {
    dataset.data.push(data.Volume_Air);
    if (dataset.data.length > 1000) {
      dataset.data.shift();
      myChart7.data.labels.shift();
    }
  });
  myChart7.update();
  push(ref(db, "Water Volume Graph"), {
    Water_Volume: data.Volume_Air,
    Time: saveTimeStamp,
  });
  volumeAir.innerHTML = data.Volume_Air;
});

onValue(ref(db, "Kekuatan Penyiraman (Tampil)"), function (snapshot) {
  const data = snapshot.val();
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  const saveTimeStamp = `${day} ${date} ${month} ${year} (${hours}:${minutes}:${seconds}:${ms})`;
  myChart8.data.labels.push(incrementSpray());
  myChart8.data.datasets.forEach((dataset) => {
    dataset.data.push(data.Kekuatan_Penyiraman);
    if (dataset.data.length > 1000) {
      dataset.data.shift();
      myChart8.data.labels.shift();
    }
  });
  myChart8.update();
  push(ref(db, "Spraying Power Graph"), {
    Spraying_Power: data.Kekuatan_Penyiraman,
    Time: saveTimeStamp,
  });
  powerPenyiraman.innerHTML = data.Kekuatan_Penyiraman;
});

window.onload = () => {
  const dbref = ref(db);
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  var arrAlt = 0;
  var arrGs = 0;
  var arrWs = 0;
  var arrBatt = 0;
  var arrLat = 0;
  var arrLon = 0;
  var arrwater = 0;
  var arrSpraying = 0;
  get(query(ref(db, "Altitude (Waktu)"), limitToLast(10))).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((data, i) => {
        arrAlt++;
        myChart1.data.labels.push(arrAlt);
        myChart1.data.datasets.forEach((dataset) => {
          dataset.data.push(data.val().Altitude);
        });
        myChart1.update();
      });
    } else {
      console.log("No data available");
    }
  });
  get(query(ref(db, "Groundspeed (Waktu)"), limitToLast(10))).then(
    (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data, i) => {
          arrGs++;
          myChart2.data.labels.push(arrGs);
          myChart2.data.datasets.forEach((dataset) => {
            dataset.data.push(data.val().Ground_Speed);
          });
          myChart2.update();
        });
      } else {
        console.log("No data available");
      }
    }
  );
  get(query(ref(db, "Windspeed (Waktu)"), limitToLast(10))).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((data, i) => {
        arrWs++;
        myChart5.data.labels.push(arrWs);
        myChart5.data.datasets.forEach((dataset) => {
          dataset.data.push(data.val().Windspeed);
        });
        myChart5.update();
      });
    } else {
      console.log("No data available");
    }
  });
  get(query(ref(db, "Latitude (Waktu)"), limitToLast(10))).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((data, i) => {
        arrLat++;
        myChart3.data.labels.push(arrLat);
        myChart3.data.datasets.forEach((dataset) => {
          dataset.data.push(data.val().Latitude);
        });
        myChart3.update();
      });
    } else {
      console.log("No data available");
    }
  });
  get(query(ref(db, "Longitude (Waktu)"), limitToLast(10)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data, i) => {
          arrLon++;
          myChart4.data.labels.push(arrLon);
          myChart4.data.datasets.forEach((dataset) => {
            dataset.data.push(data.val().Longitude);
          });
          myChart4.update();
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  get(query(ref(db, "Battery (Waktu)"), limitToLast(10)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data, i) => {
          arrBatt++;
          myChart6.data.labels.push(arrBatt);
          myChart6.data.datasets.forEach((dataset) => {
            dataset.data.push(data.val().Battery);
          });
          myChart6.update();
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  get(query(ref(db, "Volume Air (Waktu)"), limitToLast(10)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data, i) => {
          arrwater++;
          myChart7.data.labels.push(arrwater);
          myChart7.data.datasets.forEach((dataset) => {
            dataset.data.push(data.val().Volume_Air);
          });
          myChart7.update();
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  get(query(ref(db, "Kekuatan Penyiraman (Waktu)"), limitToLast(10)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data, i) => {
          arrSpraying++;
          myChart8.data.labels.push(arrSpraying);
          myChart8.data.datasets.forEach((dataset) => {
            dataset.data.push(data.val().Kekuatan_Penyiraman);
          });
          myChart8.update();
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  get(child(dbref, "Grafik"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        var d = [];
        snapshot.forEach((data, i) => {
          d.push(data.val());
        });
        localStorage.setItem("graphic", JSON.stringify(d));
      } else {
        alert("No data found");
      }
    })
    .catch((error) => {
      alert(error);
    });
};

document.getElementById("reset-graph").onclick = () => {
  nALt, nGs, nWs, nBattery, nLat, nLong, nVol, (nSpray = 0);
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ms = d.getMilliseconds();
  let waktu = hours + ":" + minutes + ":" + seconds + ":" + ms;
  myChart1.data.labels = [];
  myChart1.data.datasets.forEach((dataset) => {
    dataset.data = [];
    dataset.data.push(0);
    myChart1.data.labels.push(0);
  });
  myChart1.update();

  myChart2.data.labels = [];
  myChart2.data.datasets.forEach((dataset) => {
    dataset.data = [];
    dataset.data.push(0);
    myChart2.data.labels.push(0);
  });
  myChart2.update();

  get(query(ref(db, "Latitude (Waktu)"), limitToLast(1))).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((data, i) => {
        myChart3.data.labels = [];
        myChart3.data.labels.push(0);
        myChart3.data.datasets.forEach((dataset) => {
          dataset.data = [];
          dataset.data.push(data.val().Latitude);
        });
        myChart3.update();
      });
    } else {
      console.log("No data available");
    }
  });

  get(query(ref(db, "Longitude (Waktu)"), limitToLast(1)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data, i) => {
          myChart4.data.labels = [];
          myChart4.data.labels.push(0);
          myChart4.data.datasets.forEach((dataset) => {
            dataset.data = [];
            dataset.data.push(data.val().Longitude);
          });
          myChart4.update();
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  myChart5.data.labels = [];
  myChart5.data.datasets.forEach((dataset) => {
    dataset.data = [];
    dataset.data.push(0);
    myChart5.data.labels.push(0);
  });
  myChart5.update();

  get(query(ref(db, "Battery (Waktu)"), limitToLast(1)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data, i) => {
          myChart6.data.labels = [];
          myChart6.data.labels.push(0);
          myChart6.data.datasets.forEach((dataset) => {
            dataset.data = [];
            dataset.data.push(data.val().Battery);
          });
          myChart6.update();
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  get(query(ref(db, "Volume Air (Waktu)"), limitToLast(1)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data, i) => {
          myChart7.data.labels = [];
          myChart7.data.labels.push(0);
          myChart7.data.datasets.forEach((dataset) => {
            dataset.data = [];
            dataset.data.push(data.val().Volume_Air);
          });
          myChart7.update();
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  myChart8.data.labels = [];
  myChart8.data.datasets.forEach((dataset) => {
    dataset.data = [];
    dataset.data.push(0);
    myChart8.data.labels.push(0);
  });
  myChart8.update();
};

function myFunction() {
  document.getElementById(
    "find"
  ).innerHTML = `<h1 class="data-history">Data Result</h1>`;
}
