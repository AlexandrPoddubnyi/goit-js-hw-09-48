const body = document.querySelector('body');
const buttons = document.querySelectorAll('button');
const buttonStart = buttons[0];
const buttonStop = buttons[1];
let timerId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


buttonStart.addEventListener('click', (e) => {
  buttonStart.setAttribute('disabled', true)
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    body.style.backgroundColor = color
  }, 1000);
  console.log(timerId)
});
 
//  const color = getRandomHexColor();
//   body.style.backgroundColor = color
//   timerId = setInterval(getRandomHexColor, 1000) 


function onStopButton(evt) {
  clearTimeout(timerId);
  buttonStart.removeAttribute('disabled')
};

buttonStop.addEventListener('click', onStopButton);




