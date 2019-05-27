// Data
const laptops = [
  {
    size: 13,
    color: "white",
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "gray",
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "black",
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "white",
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "gray",
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "black",
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "gray",
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "black",
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  }
];

// Filter CLASS
class Filter {
  constructor(data) {
    this.data = data;

    this.filtredAndCreateDomCarts = function(form) {
      const checkedInputs = this.checkedInputsArray(form);
      const filtredResults = this.checkedValuesObj(checkedInputs);
      const filtredCards = this.filtredCardsArr(this.data, filtredResults);
      const filtredDomCardsMarkup = this.fitredDomCardsArr(filtredCards);
      return filtredDomCardsMarkup;
    };

    this.checkedInputsArray = function(form) {
      return Array.from(form.querySelectorAll("input:checked"));
    };

    this.checkedValuesObj = function(arr) {
      const filter = {};
      arr.forEach(element => {
        const hasFilterThisValue = filter[element.name] !== undefined;
        if (hasFilterThisValue) {
          filter[element.name].push(element.value);
        } else {
          filter[element.name] = [element.value];
        }
      });
      return filter;
    };

    this.filtredCardsArr = function(dataArr, filterResults) {
      let filtredElements = [];

      dataArr.forEach(element => {
        let elementValidationResultArr = [];

        for (let prop in filterResults) {
          if (filterResults[prop].includes(String(element[prop]))) {
            elementValidationResultArr.push(true);
          } else {
            elementValidationResultArr.push(false);
          }
        }

        if (!elementValidationResultArr.includes(false)) {
          filtredElements.push(element);
        }
      });

      return filtredElements;
    };

    this.fitredDomCardsArr = function(arr) {
      const templateSource = document.querySelector(".cart_template").innerHTML.trim();
      const templateFn = Handlebars.compile(templateSource);
      const markup = templateFn(arr);
      return markup;
    };
  }
}

// ADD event listener to filter
const formElement = document.querySelector(".js-form");
formElement.addEventListener("submit", filtredCards);



// Event listener function which create a cards element
function filtredCards(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const container = document.querySelector(".products_wrapper");
  container.innerHTML = "";

  const filterClass = new Filter(laptops);
  const filtredDomCardsMarkup = filterClass.filtredAndCreateDomCarts(form);

  container.insertAdjacentHTML("afterbegin", filtredDomCardsMarkup);
}
