//// VARIABLES ////

var create = document.getElementById('album');
var input = document.getElementById('file-input');
var photoGallery = document.querySelector('.photo-section');
// var trash = document.getElementById('dlt');
var favorite = document.getElementById('faveImg')
var title = document.getElementById('title-photo-js');
var caption = document.getElementById('caption-photo-js');
var clearStorage = document.getElementById('clear');

var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();


//// EVENT LISTENERS ////

window.addEventListener('load', appendPhotos);

create.addEventListener('click', createElement);

clearStorage.addEventListener('click', clearGallery)

// trash.addEventListener('click', deletePhoto);

// favorite.addEventListener('click', favoritePhoto);


//// FUNCTIONS ////

function appendPhotos() {
  imagesArr.forEach(function (photo) {
  console.log(typeof photo);
    photoGallery.innerHTML += `<article class="photo-card">
        <h3 class="card-photo-title" contenteditable="true">${photo.title}</h3>
        <section class="card-photo-holder"><img src=${photo.file} alt="user-photo" class="gallery-img">
        <h4 class="card-photo-caption" contenteditable="true">${photo.caption}</h4>
        </section>
        <section class="card-footer">
          <img src="images/delete.svg" class="card-btn" id="dlt" alt="delete photo" onclick="deletePhoto()">
          <img src="images/favorite.svg" class="card-btn" id="faveImg" alt="favorite photo" onclick="favoritePhoto()">
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
        <h3 class="card-photo-title" contenteditable="true">${title.value}</h3>
        <section class="card-photo-holder"><img src=${e.target.result} alt="user-photo" class="gallery-img">
        <h4 class="card-photo-caption" contenteditable="true">${caption.value}</h4>
        </section>
        <section class="card-footer">
          <img src="images/delete.svg" class="card-btn" id="dlt" alt="delete photo" onclick="deletePhoto()">
          <img src="images/favorite.svg" class="card-btn" id="faveImg" alt="favorite photo" onclick="favoritePhoto()">
        </section>
      </article>`
    imagesArr.push(newPhoto);
    newPhoto.saveToStorage(imagesArr);
}

function updatePhoto() {
  event.target.contenteditable = true;
  document.body.addEventListener('keypress', function (e) {
    var key = e.keycode;
    if (key === 13) {
    event.target.contenteditable = false;
    }
  })
}

function deletePhoto(oldPhoto) {
    // var oldPhoto = new Photo("", "", event.target.parentElement.parentElement.dataset.id);
    event.target.parentElement.parentElement.remove();
    oldPhoto.deleteFromStorage(oldPhoto.id);
}

function favoritePhoto() {
  console.log('purple')
  document.getElementById('faveImg').src = 'file://Users/raechelodom/mod1/odom-foto-finder/images/favorite-active.svg';
  saveToStorage();
  // src = "file://Users/raechelodom/mod1/odom-foto-finder/images/favorite-active.svg";
}

function clearGallery(imgesArr) {
  alert("Are you sure you want to clear ALL images?")
  localStorage.clear(imagesArr);
  location.reload();
}


