let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt('Введіть число');
  if (userInput === null) {
    break;
  }
  if (Number.isNaN(Number(userInput)) || userInput === '') {
    alert('Введено не число, спробуйте ще раз!');
  } else {
    numbers.push(Number(userInput));
  }
} while (userInput !== null);

for (let i = 0; i < numbers.length; i = i + 1) {
  total = total + numbers[i];
}

if (numbers.length >= 1) {
  alert(`Загальна сума дорівнює: ${total}`);
}
