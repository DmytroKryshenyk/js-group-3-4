export default class View {
  constructor() {
    this.template = document.querySelector('.bookmark_item-template');
    this.notValidMessage =
      'Синтаксична помилка! Введене вами значення не являється ссилкою. Виправте будь ласка.';
    this.existsMessage = 'Така закладка уже існує!';

    this.showExistMessage = () => {
      alert(this.existsMessage);
    };

    this.showNotValidMessage = () => {
      alert(this.notValidMessage);
    };

    this.createBookmarkList = function(data, list) {
      const handlebarsTamplate = this.template.innerHTML.trim();
      const handlebarsFunction = Handlebars.compile(handlebarsTamplate);
      const handlebarsMarkup = handlebarsFunction(data);
      list.innerHTML = handlebarsMarkup;
    };
  }
}
