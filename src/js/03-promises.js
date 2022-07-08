const form = document.querySelector('form');
const refs = {
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
  form: document.querySelector('form')
}
// let userDelay = parseInt(refs.inputDelay.value);
// let userStep = parseInt(refs.inputStep.value);
// let userAmount = parseInt(refs.inputAmount.value);
  

refs.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

let userDelay = parseInt(refs.inputDelay.value);
let userStep = parseInt(refs.inputStep.value);
let userAmount = parseInt(refs.inputAmount.value);
  

  if (userDelay >= 0 && userStep >= 0 && userAmount >=0){
  for (let position = 1; position <= userAmount; position += 1) {
    createPromise(position, userDelay)
      .then(value => {
        console.log(value);
      })
      .catch(error => {
        console.log(error)
      });
    userDelay += userStep;
  }
 }
});


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise(() => {
    setTimeout(() => {
      if (shouldResolve) {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
    
  

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

