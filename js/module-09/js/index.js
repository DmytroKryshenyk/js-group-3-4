const stopwatchFace = document.querySelector('.js-stopwatch_face');
const stopwatchStartBtn = document.querySelector('.js-stopwatch_start');
const stopwatchLapBtn = document.querySelector('.js-stopwatch_lap');
const stopwatchResetBtn = document.querySelector('.js-stopwatch_reset');
const stopwatchLapsList = document.querySelector('.js-stopwatch_lapsList');

class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.isActive = false;
    this.intervalID = null;
    this.workingInterval = 0;
    this.isPaused = false;
    this.pausedInterval = 0;
    this.pauseStart = 0;

    this.startOrPause = function() {
      // START stopwatch
      if (!this.isActive) {
        this.isActive = true;
        this.startTime = Date.now();
        this.intervalID = setInterval(() => {
          this.workingInterval = Date.now() - this.startTime;
          stopwatchFace.textContent = this.formatTime(this.workingInterval);
          stopwatchStartBtn.textContent = 'PAUSE';
        }, 100);
        return;
      }
      // PAUSE ON
      if (!this.isPaused) {
        this.isPaused = true;
        this.pauseStart = Date.now();
        clearInterval(this.intervalID);
        stopwatchStartBtn.textContent = 'CONTINUE';
        return;
      }
      // PAUSE OFF
      if (this.isPaused) {
        this.isPaused = false;
        this.pausedInterval =
          Date.now() - this.pauseStart + this.pausedInterval;
        this.pauseStart = 0;
        this.intervalID = setInterval(() => {
          this.workingInterval =
            Date.now() - this.startTime - this.pausedInterval;
          stopwatchFace.textContent = this.formatTime(this.workingInterval);
          stopwatchStartBtn.textContent = 'PAUSE';
        }, 100);
        return;
      }
    };

    this.reset = function() {
      if (!this.isActive) return;
      clearInterval(this.intervalID);
      stopwatchFace.textContent = '00:00.0';
      stopwatchStartBtn.textContent = 'START';
      this.isActive = false;
      this.startTime = 0;
      this.workingInterval = 0;
      this.isPaused = false;
      this.pausedInterval = 0;
      this.pauseStart = 0;
      while (stopwatchLapsList.firstChild) {
        stopwatchLapsList.removeChild(stopwatchLapsList.firstChild);
      } // це швидший спосіб чим lapsList.innerHTML = ""
    };

    this.addLap = function() {
      let listItem = document.createElement('li');
      listItem.classList.add('stopwatch_lapsItem', 'js-stopwatch_lapsItem');
      listItem.textContent = stopwatchFace.textContent;
      stopwatchLapsList.appendChild(listItem);
    };

    this.formatTime = function(time) {
      let date = new Date(time);
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let milliseconds = Number.parseInt(date.getMilliseconds() / 100);
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return `${minutes}:${seconds}.${milliseconds}`;
    };
  }
}

let stopwatch = new Stopwatch();

stopwatchStartBtn.addEventListener('click', stopwatch.startOrPause.bind(stopwatch));
stopwatchResetBtn.addEventListener('click', stopwatch.reset.bind(stopwatch));
stopwatchLapBtn.addEventListener('click', stopwatch.addLap.bind(stopwatch));
