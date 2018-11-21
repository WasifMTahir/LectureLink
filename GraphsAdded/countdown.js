let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
var firstStart = true;
var inputTime = 0;
var pause = false
var then;
var stopTime;
var startTime;
function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
  	var currentTime = Date.now()
  	var secondsLeft = Math.round((then - stopTime) / 1000);
  	if(!pause) {
  		secondsLeft = Math.round((then - currentTime) / 1000);
  	}
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  //endTime.textContent = `Ends At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

document.customForm.addEventListener('input', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  inputTime = mins * 60
});

function playpause() {
  str = document.getElementById("play").src;
  if(str.substring(str.length-12,str.length) == "pause-01.png")
  {
    document.getElementById("play").src = "images/play-01.png";
    pause = true
    stopTime = Date.now()
  }
  else
  {
    document.getElementById("play").src="images/pause-01.png";
    if(firstStart) {
    	firstStart = false
    	timer(inputTime)
    }
    else {
	    pause = false
	    startTime = Date.now()
	    then = then + (startTime - stopTime)
    }
  }
}