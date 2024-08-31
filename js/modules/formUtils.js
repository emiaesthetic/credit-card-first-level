import {el, setChildren} from 'redom';
import Inputmask from 'inputmask';
import JustValidate from 'just-validate';

export const createFormField = ({className, id, text, type = 'text'}) => {
  const wrapper = el('div', {
    className: `form__input-wrap form__input-wrap_${className}`,
  });

  const label = el('label', {
    className: `form__label form__${className}-label`,
    for: id,
  }, text);

  const input = el('input', {
    className: `input input__${className}`,
    type: `${type || 'text'}`,
    name: className,
    id: `${id}`,
  });

  setChildren(wrapper, [label, input]);

  return {
    [`${className}Wrapper`]: wrapper,
    [`${className}Input`]: input,
  };
};

export const applyInputMasks = ({numberInput, dateInput, cvvInput}) => {
  new Inputmask('9999 9999 9999 9999', {'placeholder': 'x'}).mask(numberInput);
  new Inputmask('99/99', {'placeholder': '__/__'}).mask(dateInput);
  new Inputmask('999', {'placeholder': '___'}).mask(cvvInput);
};

const validateDate = (value) => {
  const [month, year] = value.split('/').map(Number);

  if (month < 1 || month > 12 || year < 0) {
    return false;
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  return (
    year > currentYear ||
    (month >= currentMonth && year === currentYear)
  );
};

export const validateForm = (form) => {
  const validator = new JustValidate(form);

  validator
      .addField(form.holder, [
        {
          rule: 'required',
          errorMessage: 'Card holder name is required',
        },
        {
          rule: 'customRegexp',
          value: /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/,
          errorMessage: 'Please enter a valid holder name',
        },
      ])
      .addField(form.number, [
        {
          rule: 'required',
          errorMessage: 'Card number is required',
        },
        {
          rule: 'customRegexp',
          value: /^(\d{4} ){3}\d{4}$/,
          errorMessage: 'Please enter a valid 16-digit card number',
        },
      ])
      .addField(form.date, [
        {
          rule: 'required',
          errorMessage: 'Expiry date is required',
        },
        {
          rule: 'customRegexp',
          value: /^\d{2}\/\d{2}$/,
          errorMessage: 'Enter correct date',
        },
        {
          rule: 'custom',
          validator: (value) => validateDate(value),
          errorMessage: 'Enter correct date',
        },
      ])
      .addField(form.cvv, [
        {
          rule: 'required',
          errorMessage: 'CVV is required',
        },
        {
          rule: 'customRegexp',
          value: /^\d{3}$/,
          errorMessage: 'Enter correct CVV',
        },
        {
          rule: 'custom',
          validator: (value) => !(value === '000'),
          errorMessage: 'Enter correct CVV',
        },
      ]);

  Object.values(validator.fields).map(field => {
    field.elem.addEventListener('blur', () => {
      validator.revalidateField(field.elem);
    });
  });
};
