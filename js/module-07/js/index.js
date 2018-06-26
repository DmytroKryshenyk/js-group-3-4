'use strict';

// createPostCard(
//   "http://via.placeholder.com/400x150",
//   "New article",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos."
// );

/*
  1. Модифицируйте готовую функцию createPostCard() из задания
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так,
    чтобы она принимала объект post с данными для заполнения полей
    в карточке.
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает
    массив DOM-элементов всех постов.
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique!',
    link: 'link-1.com',
  },
  {
    img: 'https://placeimg.com/400/150/nature',
    title: 'Post title 2',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo.',
    link: 'link-2.com',
  },
  {
    img: 'https://placeimg.com/400/150/people',
    title: 'Post title 3',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur!',
    link: 'link-3.com',
  },
];

//===============================================

const body = document.querySelector('body');

const allPosts = [];

function createCards(posts) {
  posts.forEach(element => {
    allPosts.push(createPostCard(element));
  });
  return allPosts;
}

function createPostCard(element) {
  const post = document.createElement('div');
  post.classList.add('post');

  const postImage = document.createElement('img');
  postImage.classList.add('post__image');
  postImage.setAttribute('src', element.img);
  postImage.setAttribute('alt', 'post image');

  const postTitle = document.createElement('h2');
  postTitle.classList.add('post__title');
  postTitle.textContent = element.title;

  const postText = document.createElement('p');
  postText.classList.add('post__text');
  postText.textContent = element.text;

  const button = document.createElement('a');
  button.classList.add('button');
  button.textContent = 'Read more';
  button.setAttribute('href', element.link);

  post.append(postTitle, postImage, postText, button);
  return post;
}

createCards(posts);
body.append(...allPosts)
