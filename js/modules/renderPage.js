import {el, setChildren} from 'redom';
import {renderCreditCard} from './creditCard.js';
import {renderForm} from './form.js';
import {debounce} from './utils.js';

export const renderPage = () => {
  const title = el('h1', {className: 'secure'}, 'Secure Checkout');
  const {creditCard, cardHolder, cardNumber, cardDate} = renderCreditCard();
  const {form, holderInput, numberInput, dateInput} = renderForm();

  const updateCardDisplay = debounce(() => {
    cardHolder.textContent = holderInput.value || 'John Doe';
    cardNumber.textContent = numberInput.value || 'xxxx xxxx xxxx xxxx';
    cardDate.textContent = dateInput.value || '08/24';
  }, 200);

  holderInput.addEventListener('input', updateCardDisplay);
  numberInput.addEventListener('input', updateCardDisplay);
  dateInput.addEventListener('input', updateCardDisplay);

  const card = el('div', {className: 'card'}, [title, creditCard, form]);
  setChildren(document.body, el('div', {className: 'wrapper'}, [card]));
};
