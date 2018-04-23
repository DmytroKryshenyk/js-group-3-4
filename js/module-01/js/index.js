"use strict";

let sharm = 15;
let hurganda = 25;
let taba = 6;

let userNumberOfSeats = Number(
  prompt("Введите числом количество нужных мест!")
);

if (userNumberOfSeats % 1 === 0 && userNumberOfSeats > 0) {
  if (userNumberOfSeats <= taba) {
    let confirmationGroup = confirm(
      "Есть место в группе Taba, согласны ли Вы быть в этой группе?"
    );
    if (confirmationGroup) {
      taba = taba - 1;
      alert("Приятного путешествия в группе Taba");
    } else {
      alert("Нам очень жаль, приходите еще!");
    }
  } else if (userNumberOfSeats <= sharm) {
    let confirmationGroup = confirm(
      "Есть место в группе Sharm, согласны ли Вы быть в этой группе?"
    );
    if (confirmationGroup) {
      sharm = sharm - 1;
      alert("Приятного путешествия в группе Sharm");
    } else {
      alert("Нам очень жаль, приходите еще!");
    }
  } else if (userNumberOfSeats <= hurganda) {
    let confirmationGroup = confirm(
      "Есть место в группе Hurganda, согласны ли Вы быть в этой группе?"
    );
    if (confirmationGroup) {
      hurganda = hurganda - 1;
      alert("Приятного путешествия в группе Hurganda");
    } else {
      alert("Нам очень жаль, приходите еще!");
    }
  } else {
    alert("Извините, мест нет.");
  }
} else {
  alert("Ошибка ввода");
}
