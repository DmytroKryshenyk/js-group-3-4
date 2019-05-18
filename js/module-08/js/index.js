/* Створення галереї через class. В данному випадку так НЕ потрібно роботи 
і тут це було зроблено просто так для практики.*/

'use strict';

const galleryItems = [
  {
    preview: 'img/preview-1.jpeg',
    fullview: 'img/fullview-1.jpeg',
    alt: 'alt text 1',
  },
  {
    preview: 'img/preview-2.jpeg',
    fullview: 'img/fullview-2.jpeg',
    alt: 'alt text 2',
  },
  {
    preview: 'img/preview-3.jpeg',
    fullview: 'img/fullview-3.jpeg',
    alt: 'alt text 3',
  },
  {
    preview: 'img/preview-4.jpeg',
    fullview: 'img/fullview-4.jpeg',
    alt: 'alt text 4',
  },
  {
    preview: 'img/preview-5.jpeg',
    fullview: 'img/fullview-5.jpeg',
    alt: 'alt text 5',
  },
  {
    preview: 'img/preview-6.jpeg',
    fullview: 'img/fullview-6.jpeg',
    alt: 'alt text 6',
  },
];

class Gallery {
  constructor(galleryItemsArray, nodeElement) {
    this.galleryItemsArray = galleryItemsArray;
    this.nodeElement = nodeElement;

    this.createGallery = function() {
      // creating Fullview Block
      const fullviewBlock = document.createElement('div');
      fullviewBlock.classList.add('fullview');
      const fullviewImg = document.createElement('img');
      fullviewImg.setAttribute('src', this.galleryItemsArray[0].fullview);
      fullviewImg.setAttribute('alt', this.galleryItemsArray[0].alt);
      fullviewBlock.appendChild(fullviewImg);

      // creating Preview Block
      const previewBlock = document.createElement('ul');
      previewBlock.classList.add('preview');
      this.galleryItemsArray.forEach(element => {
        const previewLi = document.createElement('li');
        const previewImg = document.createElement('img');
        previewImg.setAttribute('src', element.preview);
        previewImg.setAttribute('data-fullview', element.fullview);
        previewImg.setAttribute('alt', element.alt);
        previewLi.appendChild(previewImg);
        previewBlock.appendChild(previewLi);
      });

      // Appending elements of gallery to nodeElement
      this.nodeElement.append(fullviewBlock, previewBlock);

      // Adding event listeners to new gallery
      const preview = document.querySelector('.preview');
      preview.addEventListener('click', changeFillViewImg);

      function changeFillViewImg(event) {
        if (event.target.nodeName !== 'IMG') return;

        const fullviewImage = document.querySelector('.fullview > img');
        fullviewImage.src = event.target.dataset.fullview;
        fullviewImage.alt = event.target.alt;
        const allPreviewImages = Array.from(document.querySelectorAll('.preview img'));

        allPreviewImages.forEach(element =>
          element.classList.add('in-active-boxshadow'),
        );
        event.target.classList.remove('in-active-boxshadow');
        event.target.classList.add('active-boxshadow');
      }
    };
  }
}

// Node element where we append gallery
const nodeElementGallery = document.querySelector('.image-gallery');

// creating and append gallery
let gallery = new Gallery(galleryItems, nodeElementGallery);
gallery.createGallery();

