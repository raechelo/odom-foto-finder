class Photo {
  constructor(title, caption, id) {
    this.title = title;
    this.caption = caption;
    this.id = id;
  }
  saveToStorage(imagesArr) {
    localStorage.setItem('photos', JSON.stringify(imagesArr));
  }

  deleteFromStorage() {

  }
  updatePhoto() {

  }
}

