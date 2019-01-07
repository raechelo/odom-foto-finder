//// VARIABLES ////

var create = document.getElementById('album');
var input = document.getElementById('file-input');
var photoGallery = document.querySelector('.photo-section');
var photoCard = document.getElementById('photo-card-js')
// var trash = document.getElementById('dlt');
var favorite = document.getElementById('faveImg')
var title = document.getElementById('title-photo-js');
var caption = document.getElementById('caption-photo-js');
var clearStorage = document.getElementById('clear');
var mainInput = document.querySelector('.main-input');


var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();


//// EVENT LISTENERS ////

window.addEventListener('load', appendPhotos);

create.addEventListener('click', createElement);

clearStorage.addEventListener('click', clearGallery);

photoGallery.addEventListener('dblclick', updateCard);

mainInput.addEventListener('keyup', enableBtn);

// trash.addEventListener('click', deletePhoto);

// favorite.addEventListener('click', favoritePhoto);


//// FUNCTIONS ////

function appendPhotos() {
  imagesArr.forEach(function (photo) {
    photoGallery.innerHTML += `<article data-id="${photo.id}" class="photo-card" id="photo-card-js">
        <h3 class="card-photo-title" contentEditable="true">${photo.title}</h3>
        <section class="card-photo-holder"><img src=${photo.file} alt="user-photo" class="gallery-img">
        <h4 class="card-photo-caption" id="card-photo-cap-js" contentEditable="true">${photo.caption}</h4>
        </section>
        <section class="card-footer">
          <img src="images/delete.svg" class="card-btn" id="dlt" alt="delete photo" onclick="deletePhoto()">
          <img src=${photo.file ? "images/favorite.svg" : "images/favorite-active.svg"} class="card-btn" id="faveImg" alt="favorite photo" onclick="favoritePhoto(event)">
        </section>
      </article>`
  })
}

function createElement() {
  if (input.files[0]) {
  reader.readAsDataURL(input.files[0]);
  reader.onload = addPhoto
  }
}

function addPhoto(e) {
  id = Date.now();
  var newPhoto = new Photo(title.value, caption.value, Date.now(), e.target.result);
    photoGallery.innerHTML += `<article data-id="${id}" class="photo-card">
        <h3 class="card-photo-title" contentEditable="true">${title.value}</h3>
        <section class="card-photo-holder"><img src=${e.target.result} alt="user-photo" class="gallery-img">
        <h4 class="card-photo-caption" id="card-photo-cap-js" contentEditable="true">${caption.value}</h4>
        </section>
        <section class="card-footer">
          <img src="images/delete.svg" class="card-btn" id="dlt" alt="delete photo" onclick="deletePhoto()">
          <img src="images/favorite.svg" class="card-btn" id="faveImg" alt="favorite photo" onclick="favoritePhoto(event)">
        </section>
      </article>`
    imagesArr.push(newPhoto);
    newPhoto.saveToStorage(imagesArr);
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
    var oldPhoto = imagesArr.find(photo => imagesArr.id === event.target.parentElement.parentElement.dataset.id);
    event.target.parentElement.parentElement.remove();
    Photo.deleteFromStorage(oldPhoto);
}

function favoritePhoto(event) {
  var photoId = parseInt(event.target.parentElement.parentElement.dataset.id);
  if (event.target.attributes.src.textContent === 'images/favorite.svg') {
    event.target.attributes.src.textContent = 'images/favorite-active.svg';
    Photo.updatePhoto(photoId, 'favorite', true)
  } else {
    event.target.src = 'images/favorite.svg';
    Photo.favorite === false;
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
   if (title.value.length >= 1 && caption.value.length >= 1) {
    album.disabled = false;
    console.log('enabled')
  } else if (title.value.length === 0 && caption.value.length === 0) {
    album.disabled = true;
  }
}

