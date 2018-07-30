const laptops = [
  {
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'gray',
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'black',
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'white',
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'gray',
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'black',
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'white',
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'gray',
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'black',
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
];

let filtredLaptops = []; //сюди загрузаться обєкти товарів, які пройшли фільтрацію
const filter = { size: [], color: [], release_date: [] }; // тут обєкт із значеннями чекнутих інпутів

const form = document.querySelector('.js-form');
const productsWrapper = document.querySelector('.products-wraper');

const source = document.getElementById('product-card-shablon').innerHTML.trim();
const template = Handlebars.compile(source);

form.addEventListener('submit', filterFn);
form.addEventListener('reset', resetForm);

function filterFn(event) {
  event.preventDefault();
  const checkedInputs = Array.from(form.querySelectorAll('.js-form input:checked')); //масив чекнутих інпутів

  fillingFilterValues(checkedInputs)
  productsFiltering(laptops);

  const markup = template(filtredLaptops);
  productsWrapper.innerHTML = markup;

  resetFilter()
}


// Функція заповнення обєкта filter вибраними значеннями інпутів
function fillingFilterValues(checkedInputs) {
  checkedInputs.forEach(element => {
    const name = element.name;
    const value = element.value;
    filter[name].push(value);
  })
}

// Функція, яка створює масив обєктів, які відповідають значенням вибраних інпутів
function productsFiltering(laptopsList) {
  laptopsList.forEach(product => {
    // Тут ниже три флаги, які відповідають чи підходить товар вибраним інпутам, якщо true значить товар підходить по цьому параметру
    let appropriateSize = false;
    let appropriateColor = false;
    let appropriateReleaseDate = false;

    //Ниже три if , які дозволяють показати товар, якщо якийсь із інпутів взагалі не був обраний
    if (filter.size.length === 0) appropriateSize = true;
    if (filter.color.length === 0) appropriateColor = true;
    if (filter.release_date.length === 0) appropriateReleaseDate = true;

    // фільтруєм по розміру
    filter.size.forEach(value => {
      if (value === String(product.size)) 
      appropriateSize = true;
    });

    // фільтруєм по польору
    filter.color.forEach(value => {
      if (value === product.color) 
      appropriateColor = true;
    });

    // фільтруєм по року випуску
    filter.release_date.forEach(value => {
      if (value === String(product.release_date)) 
      appropriateReleaseDate = true;
    });

    // якщо по всім параметрам у нас true значить товар проходить фільтрацію
    if (appropriateSize && appropriateColor && appropriateReleaseDate) filtredLaptops.push(product);
  });
}

// reset всьої форми
function resetForm(event) {
  resetFilter();
  form.reset();
}

// reset тільки фільтра
function resetFilter() {
  filter.size = [];
  filter.color = [];
  filter.release_date = [];
  filtredLaptops = []; //очищаєм масив фільтравоних обєктів від попередньої фільтрації
}