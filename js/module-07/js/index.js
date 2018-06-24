/*
  Создайте функцию createPostCard(), которая
  создает и возвращает DOM-узел карточки поста.

  Разметка с классами есть на вкладке HTML.
  Стили на вкладке CSS.

  Используйте createElement для создания узлов.
  Добавьте классы и атрибуты.
*/
"use strict";
const body = document.querySelector("body");

function createPostCard(postImageLink, post_Title, post_Text) {

  const post = document.createElement("div");
  post.classList.add("post");

  const postImage = document.createElement("img");
  postImage.classList.add("post__image");
  postImage.setAttribute("src", postImageLink);
  postImage.setAttribute("alt", "post image");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title");
  postTitle.textContent = post_Title;

  const postText = document.createElement("p");
  postText.classList.add("post__text");
  postText.textContent = post_Text;

  const button = document.createElement("a");
  button.classList.add("button");
  button.textContent = "Read more";
  button.setAttribute("href", "#");

  body.appendChild(post);
  post.append(postTitle, postImage, postText, button);
}

createPostCard(
  "http://via.placeholder.com/400x150",
  "New article",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos."
);
