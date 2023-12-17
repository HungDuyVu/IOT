const sensorDataDiv = document.getElementById('sensor-data');
const sensorList = document.getElementById('sensor-list');
const temperatureChartCanvas = document.getElementById('temperature-chart');
const humidityChartCanvas = document.getElementById('humidity-chart');
const gasSensorDiv = document.getElementById('gas');
const flameSensorDiv = document.getElementById('flame');
const alarmLight = document.getElementById('alarm-light');
const toggleAlarmLightButton = document.getElementById('toggle-alarm-light');
let isAlarmOn = false;
let isLightOn = false;

// Hàm phát cảnh báo âm thanh
function playAlarmSound() {
  // Thực hiện mã để phát cảnh báo âm thanh
  // Ví dụ: có thể sử dụng thư viện Howler.js hoặc AudioContext để phát âm thanh
}

// Hàm dừng cảnh báo âm thanh
function stopAlarmSound() {
  // Đối với Howler.js, không cần thực hiện gì cả để dừng âm thanh
  // Howler.js tự quản lý việc dừng và phát lại âm thanh
}

// Hàm bật/tắt cảnh báo và đèn cảnh báo
function toggleAlarmLight() {
  isAlarmOn = !isAlarmOn;
  isLightOn = !isLightOn;

  if (isAlarmOn) {
    playAlarmSound();
    alarmLight.style.backgroundColor = 'red';
    toggleAlarmLightButton.textContent = 'Turn Off Alarm & Light';
  } else {
    stopAlarmSound();
    alarmLight.style.backgroundColor = '#ccc';
    toggleAlarmLightButton.textContent = 'Turn On Alarm & Light';
  }

  if (isLightOn) {
    // Thực hiện các bước để bật đèn cảnh báo
    // Ví dụ: đổi màu nền, kích thước, ...
    alarmLight.style.boxShadow = '0 0 20px yellow';
  } else {
    // Thực hiện các bước để tắt đèn cảnh báo
    alarmLight.style.boxShadow = 'none';
  }
}

// Bổ sung hàm cập nhật giá trị cảm biến khí ga
function updateGasSensor(value) {
  gasSensorDiv.querySelector('#gas-value').textContent = value;
}

// Bổ sung hàm cập nhật giá trị cảm biến lửa
function updateFlameSensor(value) {
  flameSensorDiv.querySelector('#flame-value').textContent = value;
}

socket.on('mqtt-message', (data) => {
  updateSensorData(data);
  updateTemperatureChart(data.temperature);
  updateHumidityChart(data.humidity);
  updateGasSensor(data.gas);
  updateFlameSensor(data.flame);

  // Kiểm tra điều kiện để phát ra cảnh báo
  if (data.flame === 1 && isAlarmOn) {
    playAlarmSound();
  }
});

function updateSensorData(data) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `<strong>${new Date().toLocaleTimeString()}</strong>: 
    Temperature: ${data.temperature} °C, 
    Humidity: ${data.humidity} %, 
    Gas: ${data.gas}, 
    Flame: ${data.flame}`;
  sensorList.appendChild(listItem);
}

function updateTemperatureChart(temperature) {
  temperatureData.labels.push(new Date().toLocaleTimeString());
  temperatureData.datasets[0].data.push(temperature);
  temperatureChart.update();
}

function updateHumidityChart(humidity) {
  humidityData.labels.push(new Date().toLocaleTimeString());
  humidityData.datasets[0].data.push(humidity);
  humidityChart.update();
}

// Thêm vào cuối file
function updateGasSensor(value) {
  gasSensorDiv.querySelector('#gas-value').textContent = value;
}

function updateFlameSensor(value) {
  flameSensorDiv.querySelector('#flame-value').textContent = value;
}

function toggleAlarmLight() {
  isAlarmOn = !isAlarmOn;
  isLightOn = !isLightOn;

  if (isAlarmOn) {
    playAlarmSound();
    alarmLight.style.backgroundColor = 'red';
    toggleAlarmLightButton.textContent = 'Turn Off Alarm & Light';
  } else {
    stopAlarmSound();
    alarmLight.style.backgroundColor = '#ccc';
    toggleAlarmLightButton.textContent = 'Turn On Alarm & Light';
  }

  if (isLightOn) {
    // Thực hiện các bước để bật đèn cảnh báo
    // Ví dụ: đổi màu nền, kích thước, ...
    alarmLight.style.boxShadow = '0 0 20px yellow';
  } else {
    // Thực hiện các bước để tắt đèn cảnh báo
    alarmLight.style.boxShadow = 'none';
  }
}

function showInfoNotification(message) {
  showNotification(message, 'info');
}

function showWarningNotification(message) {
  showNotification(message, 'warning');
}

function showNotification(message, type) {
  const notificationContainer = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.classList.add('notification', type);
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  // Tự động ẩn thông báo sau 5 giây
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
}

socket.on('mqtt-message', (data) => {
  updateSensorData(data);
  updateTemperatureChart(data.temperature);
  updateHumidityChart(data.humidity);
  updateGasSensor(data.gas);
  updateFlameSensor(data.flame);

  // Kiểm tra điều kiện để phát ra cảnh báo
  if (data.flame === 1 && isAlarmOn) {
    playAlarmSound();
    showWarningNotification('Cảnh báo: Phát hiện lửa!');
  }

  // Kiểm tra cảm biến nhiệt độ
  if (data.temperature > 30) {
    showInfoNotification('Cảnh báo: Nhiệt độ cao!');
  }

  // Kiểm tra cảm biến độ ẩm
  if (data.humidity < 30) {
    showInfoNotification('Cảnh báo: Độ ẩm thấp!');
  }

  // Kiểm tra cảm biến gas
  if (data.gas > 50) {
    showWarningNotification('Cảnh báo: Nồng độ gas cao!');
  }
});
