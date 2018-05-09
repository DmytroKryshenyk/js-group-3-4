"use strict";

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

const addLogin = (logins, login) => {

  const checkLoginValidity = () => {
    if (login.length < 17 && login.length > 3) {
      return true;
    } else {
      return false;
    }
  };

  const checkIfLoginExists = () => {
    if (logins.includes(login)) {
      return true;
    } else {
      return false;
    }
  };


  if (checkLoginValidity()) {
    checkIfLoginExists();
  } else {
    return console.log("Ошибка! Логин должен быть от 4 до 16 символов");
  }

  if (checkIfLoginExists()) {
    return console.log("Такой логин уже используется!");
  } else {
    console.log("Логин успешно добавлен!");
    return logins.push(login);
  }
};

addLogin(logins, "dimas");
console.log(logins);

