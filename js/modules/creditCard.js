import {el, setChildren} from 'redom';

export const renderCreditCard = ({
  number = 'xxxx xxxx xxxx xxxx',
  holder = 'John Doe',
  date = '08/24',
} = {}) => {
  const creditCard = el('div', {className: 'credit-card'});
  const cardNumber = el('span', {className: 'card__number'}, number);
  const cardHolder = el('span', {className: 'card__name'}, holder);
  const cardDate = el('span', {className: 'card__date'}, date);

  setChildren(creditCard, [
    cardNumber,
    el('div', {className: 'card__personal'}, [cardHolder, cardDate]),
  ]);

  return {
    creditCard,
    cardNumber,
    cardHolder,
    cardDate,
  };
};
