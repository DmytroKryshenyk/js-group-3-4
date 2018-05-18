'use strict';

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  pork: 80,
  cheese: 60,
  tea: 20,
  candy: 25,
};

function Cashier(name = 'manger', products = {}) {
  this.name = name;
  this.products = products;

  this.totalPrice = 0;
  this.customerMoney = 0;
  this.changeAmount = 0;

  this.countTotalPrice = function(order) {
    const keys = Object.keys(order);
    for (let key of keys) {
      this.totalPrice = this.totalPrice + order[key] * this.products[key];
    }
  };

  this.getCustomerMoney = function() {
    do {
      this.customerMoney = prompt( `Загальна сума покупок: ${this.totalPrice}. Давайте гроші!`, );

      if (this.customerMoney === null) {
        return null;
      }

      if (this.customerMoney === '') {
        alert('Ти нічого не ввів!');
      }

      if (Number.isNaN(this.customerMoney)) {
        alert(`Ти ввів строку! Треба числом ${this.totalPrice}`);
      }

      if (Number(this.customerMoney) < this.totalPrice) {
        alert(`Недостатньо! Треба ${this.totalPrice}`);
      }

      if (this.customerMoney >= this.totalPrice) {
        break;
      }
    } while (true);
    this.customerMoney = Number(this.customerMoney);
  };

  this.countChange = function() {
    this.changeAmount = this.customerMoney - this.totalPrice;
  };

  this.reset = function() {
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;
  };

  this.serve = function(order) {
    this.countTotalPrice(order);
    const result = this.getCustomerMoney();
    if (result === null) {
      alert('Дуже шкода, щось пішло не так, приходьте ще');
      this.reset();
      return;
    }
    alert(`Дякуємо за покупку!`);
    this.countChange();
    this.reset();
  };
}

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

const cashier = new Cashier('Mango', products);

cashier.serve(order);
