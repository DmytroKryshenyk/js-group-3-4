
const clockface = document.querySelector(".js-clockface");
const startBtn = document.querySelector(".js-timer-start");
const stopBtn = document.querySelector(".js-timer-stop");

class Timer {
  constructor(startTime = null) {
    this.startTime = startTime;
    this.deltaTime = null;
    this.id = null;
    this.isActive = false;

    this.startTimer = function() {
      if (this.isActive) return;
      this.isActive = true;
      this.startTime = Date.now();
      this.id = setInterval(() => {
        this.deltaTime = Date.now() - this.startTime;
        updateClockface(clockface, this.deltaTime);
      }, 100);
    };

    this.stopTimer = function() {
      if (!this.isActive) return;
      this.isActive = false;
      clearInterval(this.id);
    };
  }
}

function updateClockface(elem, time) {
  elem.textContent = getFormattedTime(time);
}

function getFormattedTime(time) {
  let minutes = new Date(time).getMinutes();
  let seconds = new Date(time).getSeconds();
  let miliseconds = parseInt(new Date(time).getMilliseconds() / 100);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}.${miliseconds}`;
}

function setActiveBtn(event) {
  if (event.target.classList.contains("active")) return;

  startBtn.classList.remove("active");
  stopBtn.classList.remove("active");

  event.target.classList.add("active");
}

// =======================================

const timer = new Timer();

startBtn.addEventListener("click", timer.startTimer.bind(timer));
startBtn.addEventListener("click", setActiveBtn);

stopBtn.addEventListener("click", timer.stopTimer.bind(timer));
stopBtn.addEventListener("click", setActiveBtn);
