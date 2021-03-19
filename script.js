const minElement = document.getElementById('min')
const secElement = document.getElementById('sec')
const hrsElement = document.getElementById('hrs')

const title = document.querySelector('.title')

const btnStart = document.getElementById('start')
const btnStop = document.getElementById('stop')
const btnPause = document.getElementById('pause')
const btnContinue = document.getElementById('continue')

const minInput = document.getElementById('minInput')
const secInput = document.getElementById('secInput')
const hrsInput = document.getElementById('hrsInput')

let intervalId
let totalSeconds = 0

function timer() {
  // converting seconds logic
  let hrs = Math.floor(totalSeconds / 3600)
  let min = Math.floor(totalSeconds / 60)
  let sec = Math.floor(totalSeconds - min * 60)

  if (min > 59) {
    hrs = Math.floor(min / 60)
    min = Math.floor(min - hrs * 60)
  }

  // when the timer is running
  if (totalSeconds) {
    minInput.classList.add('hidden')
    secInput.classList.add('hidden')
    hrsInput.classList.add('hidden')
    btnStart.classList.add('hidden')
    btnStop.classList.remove('hidden')
    btnPause.classList.remove('hidden')
  }

  // when the timer stops
  else {
    alert('Time"s up!')
    stop()
  }

  // extra 0 in front of single digit numbers
  sec < 10 ? secElement.innerHTML = `0${sec}` : secElement.innerHTML = `${sec}`
  min < 10 ? minElement.innerHTML = `0${min}:` : minElement.innerHTML = `${min}:`
  hrs < 10 ? hrsElement.innerHTML = `0${hrs}:` : hrsElement.innerHTML = `${hrs}:`

  // countdown logic
  if (totalSeconds) {
    totalSeconds--
  } else {
    stop()
  }
}

function stop() {
  clearInterval(intervalId)

  btnStop.classList.add('hidden')
  btnPause.classList.add('hidden')
  btnContinue.classList.add('hidden')
  btnStart.classList.remove('hidden')
  minInput.classList.remove('hidden')
  secInput.classList.remove('hidden')
  hrsInput.classList.remove('hidden')
  title.textContent = "Awesome Timer"
  hrsElement.textContent = '00:';
  minElement.textContent = '00:';
  secElement.textContent = '00';

  totalSeconds = 0

  minInput.value = ""
  secInput.value = ""
  hrsInput.value = ""

}

// pause the timer
function pause() {
  clearInterval(intervalId)

  btnPause.classList.add('hidden')
  btnContinue.classList.remove('hidden')
}

// unpause the timer
function unpause() {
  intervalId = setInterval(timer, 1000)

  btnContinue.classList.add('hidden')
  btnPause.classList.remove('hidden')
}

// start the timer
function startTimer() {
  clearInterval(intervalId)
  intervalId = setInterval(timer, 1000)
}

// event listeners, getting total second value
minInput.addEventListener('change', (e) => {
  totalSeconds += Math.floor(parseInt(e.target.value * 60))
})

secInput.addEventListener('change', (e) => {
  totalSeconds += Math.floor(parseInt(e.target.value))
})

hrsInput.addEventListener('change', (e) => {
  totalSeconds += Math.floor(parseInt(e.target.value * 3600))
})

// calling the startTimer() function when the "start" button is clicked
btnStart.addEventListener('click', startTimer)

btnStop.addEventListener('click', stop)

btnPause.addEventListener('click', pause)

btnContinue.addEventListener('click', unpause)

