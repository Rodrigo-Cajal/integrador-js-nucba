const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const isEmpty = (input) => {
  return input.value.trim().length === 0;
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length < max;
};

const isEmailValid = (input) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(input.value.trim());
};

const isValidPhone = (input) => {
  const re = /^\d{10}$/;
  return re.test(input.value.trim());
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkTextInput = (input) => {
  let valid = false;
  const minCharacters = 3;
  const maxCharacters = 25;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isBetween(input, minCharacters, maxCharacters)) {
    showError(
      input,
      `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
    );
    return;
  }
  showSuccess(input);
  valid = true;
  return valid;
};

const checkEmail = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isEmailValid(input)) {
    showError(input, "El email no es valido");
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

const checkPhone = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isValidPhone(input)) {
    showError(input, "El telefono debe tener 10 digitos");
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

const showSuccessMessage = () => {
  const successMessageElement = document.createElement("p");
  successMessageElement.textContent = "Mensaje enviado correctamente.";
  successMessageElement.classList.add("success-message");

  registerForm.insertAdjacentElement("afterend", successMessageElement);

  setTimeout(() => {
    successMessageElement.remove();
    registerForm.reset();
    removeSuccessBorder();
  }, 3000);
};

const removeSuccessBorder = () => {
  const formFields = registerForm.querySelectorAll(".form__field");
  formFields.forEach((field) => {
    field.classList.remove("success");
  });
};

const validateFormOnSubmit = (event) => {
  event.preventDefault();

  let isValid = true;

  if (!checkTextInput(nameInput)) {
    isValid = false;
  }

  if (!checkTextInput(lastNameInput)) {
    isValid = false;
  }

  if (!checkEmail(emailInput)) {
    isValid = false;
  }

  if (!checkPhone(phoneInput)) {
    isValid = false;
  }

  if (isValid) {
    showSuccessMessage();
  }
};

const initializeForm = () => {
  registerForm.addEventListener("submit", validateFormOnSubmit);

  nameInput.addEventListener("input", () => checkTextInput(nameInput));
  lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  phoneInput.addEventListener("input", () => checkPhone(phoneInput));
};

initializeForm();
