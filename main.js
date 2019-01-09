//// VARIABLES ////

var create = document.getElementById('album');
var input = document.getElementById('file-input');
var photoGallery = document.querySelector('.photo-section');
var photoCard = document.getElementById('photo-card-js')
var card = document.getElementById('card-footer')
var title = document.getElementById('title-photo-js');
var caption = document.getElementById('caption-photo-js');
var clearStorage = document.getElementById('clear');
var mainInput = document.querySelector('.main-input');
var fileUpload = document.querySelector('.upload-file');
var searchBar = document.getElementById('nav-search-js');



var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();


//// EVENT LISTENERS ////

window.addEventListener('load', appendPhotos(imagesArr));

input.addEventListener('change', enableBtn);

create.addEventListener('click', createElement);

clearStorage.addEventListener('dblclick', clearGallery);

photoGallery.addEventListener('dblclick', updateCard);

searchBar.addEventListener('input', searchPhotos);

photoGallery.addEventListener('click', faveOrDelete);

//// FUNCTIONS ////

function appendPhotos(array) {
  imagesArr = [];
  array.forEach(function (photo) {
    var newPhoto = new Photo (photo.title, photo.caption, photo.id, photo.file, photo.favorite)
    imagesArr.push(newPhoto);
  })
  displayArray(imagesArr), hideHeader();
}

function displayArray(arr) {
  photoGallery.innerHTML = '';
  arr.forEach(photo => addPhoto(photo));
}

function createElement() {
  if (input.files[0]) {
  reader.readAsDataURL(input.files[0]);
  reader.onload = firstPhoto
  }
}

function firstPhoto(e) {
  var newPhoto = new Photo(title.value, caption.value, Date.now(), e.target.result);
    imagesArr.push(newPhoto);
    newPhoto.saveToStorage(imagesArr);
    displayArray(imagesArr);
    clearFields();
}

function addPhoto(photo) {
    photoGallery.innerHTML += `<article data-id="${photo.id}" class="photo-card">
        <h3 class="card-photo-title" contentEditable="true">${photo.title}</h3>
        <section class="card-photo-holder"><img src=${photo.file} alt="user-photo" class="gallery-img">
        <h4 class="card-photo-caption" id="card-photo-cap-js" contentEditable="true">${photo.caption}</h4>
        </section>
        <section class="card-footer">
          <img src="images/delete.svg" class="card-btn deleted" id="dlt" alt="delete photo">
          <img src=${photo.favorite ? "images/favorite-active.svg" : "images/favorite.svg"} class="card-btn fave" id="faveImg" alt="favorite photo">
        </section>
      </article>`
}

function updateCard(event) {
    var photoId = parseInt(event.target.parentElement.dataset.id);
    var photoCapId = parseInt(event.target.parentElement.parentElement.dataset.id);
    document.body.addEventListener('keypress', function (e) {
    var key = e.keyCode;
    if (key === 13) {
    if (event.target.className === 'card-photo-title') {
      Photo.updatePhoto(photoId, 'title', event.target.innerText);
    } else if (event.target.className === 'card-photo-caption') {
      Photo.updatePhoto(photoCapId, 'caption', event.target.innerText);
    }
      event.target.contentEditable = false;
      event.target.blur();
    }
  })
}

function deletePhoto(id) {
    var index = imagesArr.findIndex(photo => photo.id === id)
    event.target.parentElement.parentElement.remove();
    imagesArr[index].deleteFromStorage(index, imagesArr);
    hideHeader();
}

function favoritePhoto(event) {
  var photoId = parseInt(event.target.parentElement.parentElement.dataset.id);
  if (event.target.attributes.src.textContent === 'images/favorite.svg') {
    event.target.attributes.src.textContent = 'images/favorite-active.svg';
    Photo.updatePhoto(photoId, 'favorite', true)
  } else {
    event.target.src = 'images/favorite.svg';
    Photo.updatePhoto(photoId, 'favorite', false)
  }
}

function clearGallery(imgesArr) {
  alert("Are you sure you want to clear ALL images?")
  localStorage.clear(imagesArr);
  location.reload();
}

function enableBtn() {
  var albumBtn = document.getElementById('album'); 
   if (fileUpload.files.length >= 1) {
    album.disabled = false;
  }
}

function hideHeader() {
  if (imagesArr.length === 0) {
    photoGallery.insertAdjacentHTML('afterbegin', `<h2>You Need Photos!</h2>`)
  }
}

function searchPhotos() {
  var localStoragePhotos = JSON.parse(localStorage.getItem('photos'));
  photoGallery.innerHTML = "";
  var findPhoto = searchBar.value;
  if (findPhoto[0]) {
  var filteredPhotos = localStoragePhotos.filter(photo => photo.title.includes(findPhoto) || photo.caption.includes(findPhoto))
    appendPhotos(filteredPhotos);
  } else {
    appendPhotos(imagesArr);
  }
}

function clearFields() {
  title.value = '';
  caption.value = '';
  input.value = '';
}

function faveOrDelete(e) {
  var cardId = parseInt(e.target.parentElement.parentElement.dataset.id)
  if (e.target.classList.contains('fave')) {
    favoritePhoto(event);
  } else if (e.target.classList.contains('deleted')) {
    deletePhoto(cardId);
  }
}



