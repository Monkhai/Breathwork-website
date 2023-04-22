const inhaleBtnEl = document.querySelector('.inhale_btn');
const resetBtnEl = document.querySelector('.reset_btn');
const startBtnEl = document.querySelector('.start_btn');
const breathGuideEl = document.querySelector('.breath_guide');
const stopwatchEl = document.querySelector('.stopwatch');
const countdownEl = document.querySelector('.countdown');
const staticEl = document.querySelector('.static');
const titleEl = document.querySelector('.round_header');

//-------------------------------------------------//
//----------------Global Variables-----------------//
//-------------------------------------------------//
let stopwatchInterval = 0;
let roundTally = 0;
//-------------------------------------------------//
//----------------Global Variables-----------------//
//-------------------------------------------------//

//-------------------------------------------------//
//-----------------EVENT LISTENERS-----------------//
//-------------------------------------------------//
startBtnEl.addEventListener('click', startRound);

breathGuideEl.addEventListener('ended', startHold);

inhaleBtnEl.addEventListener('click', startInhale);

resetBtnEl.addEventListener('click', resetApp);
//-------------------------------------------------//
//-----------------EVENT LISTENERS-----------------//
//-------------------------------------------------//

//-------------------------------------------------//
//--------------------FUNCTIONS--------------------//
//-------------------------------------------------//
function startInhale() {
  countdownEl.classList.remove('hide');
  stopwatchEl.classList.add('hide');
  breathGuideEl.classList.add('hide');
  inhaleBtnEl.classList.add('hide');

  recordHold();
  resetHoldTimer();

  let countdownInterval;
  let remainingTime = 15000;

  clearInterval(countdownInterval);

  countdownInterval = setInterval(function () {
    remainingTime -= 10;
    const seconds = Math.floor(remainingTime / 1000);
    const milliseconds = Math.floor((remainingTime % 1000) / 10);
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(2, '0');

    countdownEl.textContent = `${formattedSeconds}.${formattedMilliseconds}`;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      countdownEl.textContent = '00.000';
      countdownEl.classList.add('hide');
      startRound();
    }
  }, 10);
}

function startRound() {
  breathGuideEl.classList.remove('hide');
  staticEl.classList.add('hide');
  resetBtnEl.classList.remove('hide');
  startBtnEl.classList.add('hide');
  roundTally++;

  breathGuideEl.currentTime = 0;
  breathGuideEl.play();
}

function startHold() {
  breathGuideEl.classList.add('hide');
  stopwatchEl.classList.remove('hide');
  inhaleBtnEl.classList.remove('hide');

  breathGuideEl.currentTime = 0;

  let startTime = 0;

  startTime = Date.now();

  clearInterval(stopwatchInterval);

  stopwatchInterval = setInterval(function () {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(2, '0');
    stopwatchEl.textContent = `${formattedSeconds}.${formattedMilliseconds}`;
  }, 10);
}

function recordHold() {
  const stopwatchTime = stopwatchEl.textContent;

  const record = document.createElement('p');

  record.classList.add('round_record');
  record.innerHTML = `<b>round ${roundTally}:</b> ${stopwatchTime}s`;

  document.querySelector('.records').appendChild(record);
}

function resetHoldTimer() {
  clearInterval(stopwatchInterval);
  stopwatchEl.textContent = '00.00';
  startTime = null;
}

function resetApp() {
  roundTally = 0;

  resetBtnEl.classList.add('hide');
  inhaleBtnEl.classList.add('hide');
  stopwatchEl.classList.add('hide');
  countdownEl.classList.add('hide');
  breathGuideEl.classList.add('hide');

  startBtnEl.classList.remove('hide');
  staticEl.classList.remove('hide');

  document.querySelectorAll('.round_record').forEach((item) => {
    item.remove();
  });
}
//-------------------------------------------------//
//--------------------FUNCTIONS--------------------//
//-------------------------------------------------//
