import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

/////////////////////////////////////////////////////////////////////////////////////////////
const timerDiv = document.querySelector('.timer');
timerDiv.setAttribute('style', 'display: flex');
const timerCountDivs = document.querySelectorAll('.field');
timerCountDivs[0].setAttribute('style', 'display: flex; flex-direction: column ; align-items: center; margin-left: 20px');
timerCountDivs[1].setAttribute('style', 'display: flex; flex-direction: column ; align-items: center; margin-left: 20px');
timerCountDivs[2].setAttribute('style', 'display: flex; flex-direction: column ; align-items: center; margin-left: 20px');
timerCountDivs[3].setAttribute('style', 'display: flex; flex-direction: column ; align-items: center; margin-left: 20px');
const input = document.querySelector('input');
input.setAttribute('style','margin-left: 45px')
//////////////////////////////////////////////////////////////////////////////////////////////

const startButton = document.querySelector('button');
startButton.setAttribute('disabled', true);

const timerDays = document.querySelector('[data-days]');
const timeHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
let selectedDate = null;
let timerId = null;
let datesDifference = null;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert("Please choose a date in the future")
    } else {
      startButton.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }   
    console.log(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}




startButton.addEventListener('click', onStart);

  function onStart (event){
  event.preventDefault();
  timerId = setInterval (() => {
    datesDifference = selectedDate - Date.now();
    if (datesDifference < 0) {
      clearInterval(timerId);
      return;
    } else {
      RefreshTextContent(datesDifference);
    }
  }, 1000);

  console.log(timerId)
}

function addLeadingZero(value) {
  return String(value).padStart(2,'0');
}
  

function RefreshTextContent(datesUpdate) {
    timerDays.textContent = addLeadingZero(convertMs(datesUpdate).days);
    timeHours.textContent = addLeadingZero(convertMs(datesUpdate).hours);
    timerMinutes.textContent = addLeadingZero(convertMs(datesUpdate).minutes);
    timerSeconds.textContent = addLeadingZero(convertMs(datesUpdate).seconds);
}



