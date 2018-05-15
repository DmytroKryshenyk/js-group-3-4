"use strict";

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

const checkLoginValidity = log => {
  return log.length < 17 && log.length > 3;
};

const checkIfLoginExists = (logs, log) => {
  return logins.includes(log);
};

const addLogin = (logins, login) => {
  if (!checkLoginValidity(login)) {
    console.log("Ошибка! Логин должен быть от 4 до 16 символов");
    return;
  }

  if (checkIfLoginExists(logins, login)) {
    console.log("Такой логин уже используется!");
    return;
  }

  console.log("Логин успешно добавлен!");
  return logins.push(login);
};

addLogin(logins, "Dmytro");
console.log(logins);
