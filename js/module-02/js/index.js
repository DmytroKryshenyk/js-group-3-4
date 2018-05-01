"use strict";

let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt("Введіть число");
  if (Number.isNaN(Number(userInput)) || userInput === "" || userInput === null) {
    alert("Введено не число, спробуйте ще раз!");
  }
  else {
    numbers.push(Number(userInput));
  }
} while (userInput !== null);

for (let i = 0; i < numbers.length; i = i + 1) {
  total = total + numbers[i];
}
console.log(`Загальна сума дорівнює: ${total}`);
