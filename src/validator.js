const validateName = (data) => (data.trim().length > 5 ? true : new Error('Поле должно содержать более 6 символов'));
const validateEmail = (data) => ((/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i).test(data) ? true : new Error('Введите корректный email!'));
const validatePhone = (data) => ((/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/).test(data) ? true : new Error('Введите корректный номер телефона!'));

const validate = (data, inputName) => {
  switch (inputName) {
    case 'email':
      return validateEmail(data);
    case 'name':
      return validateName(data);
    case 'surname':
      return validateName(data);
    case 'phone':
      return validatePhone(data);
  }
};
export default validate;
