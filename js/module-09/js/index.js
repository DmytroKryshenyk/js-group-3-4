/*
  Создайте скрипт приложения-секундомера.

  Изначально в HTML есть разметка:

  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>

  Добавьте следующий функционал:

  - При нажатии на кнопку button.js-start, запускается таймер, который считает время
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).

    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.

  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause',
    а функционал при клике превращается в оставновку секундомера без сброса
    значений времени.

    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.

  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, таймер продолжает отсчет времени,
    как будто паузы небыло, а текст меняется на 'Pause'. То есть если во время нажатия
    'Pause' прошло 6 секунд со старта, при нажатии 'Continue' 10 секунд спустя, секундомер
    продолжит отсчет времени с 6 секунд и дальше, а не с 16.

    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.

  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.

  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

const time = document.querySelector('.js-time');
const start = document.querySelector('.js-start');
const lap = document.querySelector('.js-take-lap');
const reset = document.querySelector('.js-reset');
const lapsList = document.querySelector('.js-laps');

start.addEventListener('click', startTimer);
lap.addEventListener('click', takeLap);
reset.addEventListener('click', resetTimer);
let timerActive = false;
let timerIntervalID = null;
let startTime = 0;
let pauseStartTime = null;
let pauseActive = false;
let arrayOfPauseIntervals = [];
let sumOfPauseIntervals = 0;

function startTimer() {
  //START Timer
  if (!timerActive) {
    timerActive = true;
    startTime = Date.now();
    timerIntervalID = setInterval(() => (time.textContent = getFormatedTime(Date.now() - startTime)), 100);
    start.textContent = 'PAUSE';
    return;
  }

  //PAUSE ON
  if ( start.textContent === 'PAUSE' && !pauseActive ) {
    pauseActive = true;
    clearInterval(timerIntervalID);
    pauseStartTime = Date.now();
    time.textContent = getFormatedTime(pauseStartTime - startTime - sumOfPauseIntervals);
    start.textContent = 'CONTINUE';
    return;
  }

  //PAUSE OFF
  if (start.textContent === 'CONTINUE' && pauseActive) {
    pauseActive = false;
    let pauseTime = Date.now() - pauseStartTime;
    arrayOfPauseIntervals.push(pauseTime);
    sumOfPauseIntervals = arrayOfPauseIntervals.reduce((sum, current) => sum + current, 0);
    timerIntervalID = setInterval(
      () => (time.textContent = getFormatedTime(Date.now() - startTime - sumOfPauseIntervals)),
      100);
    pauseStartTime = null;
    start.textContent = 'PAUSE';
    return;
  }
}

function takeLap() {
  if (!timerActive) return;
  let lap = document.createElement('li');
  let lapTime;
  if (pauseActive) {
    lapTime = getFormatedTime(pauseStartTime - startTime - sumOfPauseIntervals);
  } else {lapTime = getFormatedTime(Date.now() - startTime - sumOfPauseIntervals);}
  lap.textContent = lapTime;
  lapsList.appendChild(lap);
}

function resetTimer() {
  if (!timerActive) return;
  time.textContent = '00:00.0';
  start.textContent = 'START';
  startTime = 0;
  pauseActive = false;
  pauseStartTime = null;
  arrayOfPauseIntervals = [];
  sumOfPauseIntervals = 0;
  timerActive = false;
  clearInterval(timerIntervalID)
}

// ==============================================================================
function getFormatedTime(time) {
  const date = new Date(time);
  let dateMinutes = date.getMinutes(time);
  let dateSeconds = date.getSeconds(time);
  let dateMilliseconds = String(date.getMilliseconds(time)).slice(0, 1);
  if (dateMinutes < 10) dateMinutes = '0' + dateMinutes;
  if (dateSeconds < 10) dateSeconds = '0' + dateSeconds;
  return `${dateMinutes}:${dateSeconds}.${dateMilliseconds}`;
}

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

  Выполните домашнее задание используя класс с полями и методами.

  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет
  динамически создана вся разметка для секундомера.

  Должна быть возможность создать сколько угодно экземпляров секундоментов
  на странице и все они будут работать независимо.

  К примеру:

  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);

  Где parent* это существующий DOM-узел.
*/
