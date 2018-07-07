'use strict';

const galleryItems = [
  { preview: 'img/preview-1.jpeg', fullview: 'img/fullview-1.jpeg', alt: "alt text 1" },
  { preview: 'img/preview-2.jpeg', fullview: 'img/fullview-2.jpeg', alt: "alt text 2" },
  { preview: 'img/preview-3.jpeg', fullview: 'img/fullview-3.jpeg', alt: "alt text 3" },
  { preview: 'img/preview-4.jpeg', fullview: 'img/fullview-4.jpeg', alt: "alt text 4" },
  { preview: 'img/preview-5.jpeg', fullview: 'img/fullview-5.jpeg', alt: "alt text 5" },
  { preview: 'img/preview-6.jpeg', fullview: 'img/fullview-6.jpeg', alt: "alt text 6" },
];

const imageGallery = document.querySelector('.image-gallery');

const addGallery = new CreateGallery(galleryItems);

// ====================================================

function CreateGallery(massOfImg) {
  const fullviewCreator = document.createElement('div');
  fullviewCreator.classList.add('fullview');

  const fullviewImg = document.createElement('img');
  fullviewImg.setAttribute('src', massOfImg[0].fullview);
  fullviewImg.setAttribute('alt', massOfImg[0].alt);

  fullviewCreator.appendChild(fullviewImg);

  const previewCreator = document.createElement('ul');
  previewCreator.classList.add('preview');

  massOfImg.forEach(function fillSmallImages(element) {
    const previewLi = document.createElement('li');
    const previewImg = document.createElement('img');
    previewImg.setAttribute('src', element.preview);
    previewImg.setAttribute('data-fullview', element.fullview);
    previewImg.setAttribute('alt', element.alt);
    previewCreator.appendChild(previewLi);
    previewLi.appendChild(previewImg);
  });

  imageGallery.append(fullviewCreator, previewCreator);

  const preview = document.querySelector('.preview');
  preview.addEventListener('click', changeFillViewImg);
}

function changeFillViewImg(event) {
  if (event.target.nodeName !== 'IMG') return;

  const fullviewImage = document.querySelector('.fullview > img');
  fullviewImage.src = event.target.dataset.fullview;
  fullviewImage.alt = event.target.alt;

  const allPreviewImages = Array.from(
    document.querySelectorAll('.preview img'),
  );
  allPreviewImages.forEach(element => (element.style.boxShadow = 'none'));
  event.target.style.boxShadow = '0 0 0.3125rem 0 #000000';
}
