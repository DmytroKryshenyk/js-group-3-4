'use strict';

const initialUsers = [
  {
    id: '-s19a6hqce',
    login: 'mangozedog@mail.com',
    password: 'qwe123zv',
    isActive: true,
  },
  {
    id: '-qkpzenjxe',
    login: 'polysweet@skynet.ze',
    password: '123zxc78',
    isActive: true,
  },
  {
    id: '-e51cpd4di',
    login: 'ajax2k@change.ua',
    password: 'ert234qw',
    isActive: false,
  },
];

const initialPosts = {
  '-s19a6hqce': [
    { id: '-5sgljaskg', text: 'post #1', likes: 3 },
    { id: '-199hb6igr', text: 'post #2', likes: 5 },
    { id: '-hy0eyw5qo', text: 'post #3', likes: 13 },
  ],
  '-qkpzenjxe': [
    { id: '-5tu69g5rf', text: 'post #1', likes: 8 },
    { id: '-bje766393', text: 'post #2', likes: 15 },
  ],
  '-e51cpd4di': [
    { id: '-9y6nkmlj4', text: 'post #1', likes: 18 },
    { id: '-i03pbhy3s', text: 'post #2', likes: 45 },
  ],
};

const getId = () =>
  '-' +
  Math.random()
    .toString(36)
    .substr(2, 9);

function SocialBook(users = [], posts = {}) {
  this.users = users;
  this.posts = posts;

  this.getAllUsers = () => this.users;

  this.getUserByLogin = login => {
    return this.users.find(element => element.login === login);
  };

  this.getUserStatus = userId => {
    let result = 'inactive';
    this.users.find(element => {
      if (element.id === userId && element.isActive) {
        return (result = 'active');
      }
    });
    return result;
  };

  this.addUser = user => {
    user.id = getId();
    user.isActive = false;
    this.users.push(user);
  };

  this.removeUserById = userId => this.users = this.users.filter(element => element.id !== userId);

  this.getUsersCount = () => this.users.length;

  // //ДОП ЗАВДАННЯ

  this.getUserPosts = userId => this.posts[userId];

  this.addPost = (userId, post) => this.posts[userId].push(post);

  this.removePost = (userId, postId) => {
    this.posts[userId] = this.posts[userId].filter(element => element.id !== postId);
  };

  this.getAllLikes = userId => {
    let userPosts = this.posts[userId];
    return userPosts.reduce((sum, current) => sum + current.likes, 0);
  };

  this.addPostLike = (userId, postId) => {
    this.posts[userId].forEach(element => {
      if (element.id === postId) {
        element.likes += 1;
      }
    });
  };

  this.getPostsCount = userId => this.posts[userId].length;
}

const book = new SocialBook(initialUsers, initialPosts);

// // ============================
// // ============================
// // Консоль логи і запуски функцій для провірки

console.log(book.getAllUsers());

console.log(book.getUserByLogin("polysweet@skynet.ze"))

console.log(book.getUserStatus('-qkpzenjxe'));
console.log(book.getUserStatus('-e51cpd4di'));

book.addUser({ email: "DmytroRobota@gmail.com", password: "blablabla" });
console.log(book.users);

book.removeUserById('-e51cpd4di');
console.log(book.users);

console.log(book.getUsersCount());

// //============================
// // ============================
// // Провірка доп завдань

console.log(book.getUserPosts("-qkpzenjxe"))

book.addPost("-e51cpd4di", { id: getId(), text: "post #2 bla bla", likes: 666 })
console.log(book.posts)

book.removePost("-s19a6hqce", "-199hb6igr")
console.log(book.posts)

console.log(book.getAllLikes("-qkpzenjxe"));

book.addPostLike("-s19a6hqce", "-5sgljaskg");
console.log(book.posts);

console.log(book.getPostsCount("-qkpzenjxe"));
