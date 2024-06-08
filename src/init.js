import validate from './validator.js';
import onChange from 'on-change';

export default () => {
  const elements = {
    email: document.querySelector('input[name="email"]'),
    phone: document.querySelector('input[name="phone"]'),
    name: document.querySelector('input[name="name"]'),
    feedback: document.querySelector('.feedback'),
    surname: document.querySelector('input[name="surname"]'),
    comment: document.querySelector('textarea'),
    button: document.querySelector('input[type="submit"]'),
    form: document.querySelector('form'),
    container: document.querySelector('.container'),
    inputs: document.querySelectorAll('.need-validation'),
  };

  const state = {
    form: {
        name: null,
        surname: null,
        email: null,
        phone: null,
        errors: {
            name: '',
            surname: '',
            email: '',
            phone: '',
        },
        state: 'filling',
        valid: false,
    },
    serverMessage: '',
  };

  const renderError = (inputName, errorText) => {
    if (errorText.length===0) {
      elements.feedback.classList.remove('not-valid');
    elements.feedback.textContent = errorText;
    elements[inputName].classList.remove('not-valid');
    elements[inputName].classList.add('valid');
    } else {
      elements.button.setAttribute('disabled', 'disabled');
      elements[inputName].classList.remove('valid');
    elements.feedback.classList.add('not-valid');
    elements.feedback.textContent = errorText;
    elements[inputName].classList.add('not-valid');
  }}

const initView = (state, elements) => onChange(state, (path, value) => {
  if (path.startsWith('form.errors')) {
    const input=path.split('.')[2];
    renderError(input, value);
  } else if (path==='form.valid') {
    if(value) {
      elements.button.removeAttribute('disabled');
    } else {
      elements.button.setAttribute('disabled', 'disabled');
    }
  } else if (path==='serverMessage') {
      elements.container.textContent = value;
  }

});

  const watchedState = initView(state, elements);

  elements.inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        e.preventDefault();
        const inputName = e.target.name;
        const text = e.target.value;
        const validationResult = validate(text, inputName);
        watchedState.form[inputName] = text;
        if (validationResult===true) {
            watchedState.form.errors[inputName] = '';
        } else {
            watchedState.form.errors[inputName] = validationResult.message;
        }
        const validForm = !Object.values(watchedState.form.errors)
      .filter(err=>err!=='').length > 0;
      if(validForm) {
        watchedState.form.valid = true;
      } else {
        watchedState.form.valid = false;
      }
    })
  })

const callBackendAPI = async () => {
  const response = await fetch('http://localhost:5000/back');
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
};

// const callBackendAPI = async() => {
//   const response = fetch('http://localhost:5000/back', {
//       method: 'POST',
//       body: JSON.stringify(state),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })
//   const body = await response.json();
//   return body;
// }

elements.form.addEventListener('submit', (e)=> {
  e.preventDefault()

//   fetch('http://localhost:5000/back', {
//   method: 'POST',
//   body: JSON.stringify(state),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//   }
// )

  callBackendAPI()
  .then(res => {
    watchedState.form.state = "success";
    watchedState.serverMessage =res.express;
  })
  .catch(err => {
    watchedState.form.state = "invalid";
    watchedState.serverMessage = err.message;
  });
})

};

