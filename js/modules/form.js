import {el, setChildren} from 'redom';
import {createFormField, applyInputMasks, validateForm} from './formUtils.js';

export const renderForm = () => {
  const form = el('form', {className: 'form', id: 'form', action: '#'});

  const {holderWrapper, holderInput} = createFormField({
    className: 'holder',
    id: 'cardHolder',
    type: 'text',
    text: 'Card Holder',
  });

  const {numberWrapper, numberInput} = createFormField({
    className: 'number',
    id: 'cardNumber',
    type: 'tel',
    text: 'Card Number',
  });

  const {dateWrapper, dateInput} = createFormField({
    className: 'date',
    id: 'cardDate',
    type: 'tel',
    text: 'Card Expiry',
  });

  const {cvvWrapper, cvvInput} = createFormField({
    className: 'cvv',
    id: 'cardCVV',
    type: 'tel',
    text: 'CVV',
  });

  const formButton = el('button', {className: 'form__button'}, 'CHECK OUT');

  setChildren(form, [
    holderWrapper,
    numberWrapper,
    dateWrapper,
    cvvWrapper,
    formButton,
  ]);

  applyInputMasks({numberInput, dateInput, cvvInput});
  validateForm(form);

  return {
    form,
    holderInput,
    numberInput,
    dateInput,
    cvvInput,
  };
};
