'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const checkLoginValidity = log => {
  return log.length < 17 && log.length > 3 ? true : false;
};

const checkIfLoginExists = (logs, log) => {
  return logins.includes(log) ? true : false;
};

const addLogin = (logins, login) => {
  if (!checkLoginValidity(login)) {
    return console.log('Ошибка! Логин должен быть от 4 до 16 символов');
  }

  checkIfLoginExists(logins, login);

  if (!checkIfLoginExists(logins, login)) {
    console.log('Логин успешно добавлен!');
    return logins.push(login);
  }

  return console.log('Такой логин уже используется!');
};

addLogin(logins, 'Poe');
console.log(logins);
