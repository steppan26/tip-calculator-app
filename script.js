const billAmountInputElement = document.getElementById('bill-amount-input');
const numberOfPeopleElement = document.getElementById('nb-of-people-input');
const customTipElement = document.getElementById('custom-tip-input');
const tipButtonElements = document.querySelectorAll('.btn-tip-percentage');

const calculateAndDisplayValue = () => {
  const displayTotalAmountElement = document.getElementById('display-total');
  const displayTipAmountElement = document.getElementById('display-per-person');
  const selectedTipValue = Number(document.querySelector('.active').dataset.value);
  const numberOfPeopleValue = Number(numberOfPeopleElement.value);
  const totalAmount = Number(billAmountInputElement.value) * (1 + (selectedTipValue/ 100));
  displayTipAmountElement.innerText = `€${Number(totalAmount / numberOfPeopleValue).toFixed(2)}`;
  displayTotalAmountElement.innerText = `€${Number(totalAmount).toFixed(2)}`;
}

const tipButtonClickHandler = (event) => {
  tipButtonElements.forEach(buttonElement => {
    buttonElement.classList.remove('active')
    buttonElement.classList.add('inactive')
  })
  customTipElement.classList.remove('active');
  event.currentTarget.classList.remove('inactive');
  event.currentTarget.classList.add('active');
  render()
}

const render = () => {
  if (numberOfPeopleElement.value === '0') {
    document.querySelector('.error-message').classList.add('show-message');
    console.log(document.querySelector('.error-message'));
  } else {
    document.querySelector('.error-message').classList.remove('show-message');
    calculateAndDisplayValue()
  }
};

numberOfPeopleElement.addEventListener('change', render)
billAmountInputElement.addEventListener('change', render);

tipButtonElements.forEach(buttonElement => {
  buttonElement.addEventListener('click', tipButtonClickHandler)
})

customTipElement.addEventListener('click', () => {
  tipButtonElements.forEach(buttonElement => {
    buttonElement.classList.remove('active')
    buttonElement.classList.add('inactive')
  })
  customTipElement.classList.add('active');
  customTipElement.dataset.value = customTipElement.value;
  render();
})

customTipElement.addEventListener('change', () => {
  customTipElement.dataset.value = customTipElement.value;
  render();
})

document.getElementById('reset').addEventListener('click', (event) => {
  billAmountInputElement. value = 0;
  numberOfPeopleElement.value = 1;
  tipButtonElements.forEach(buttonElement => {
    if (buttonElement.dataset.value === '15') {
      buttonElement.classList.add('active')
      buttonElement.classList.remove('inactive')
    } else {
      buttonElement.classList.remove('active')
      buttonElement.classList.add('inactive')
    }
  })
  customTipElement.classList.remove('active');
  customTipElement.value = "";
  render();
})
