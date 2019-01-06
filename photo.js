class Photo {
  constructor(title, caption, id, file) {
    this.title = title;
    this.caption = caption;
    this.id = id;
    this.file = file;
  }
  saveToStorage(imagesArr) {
    localStorage.setItem('photos', JSON.stringify(imagesArr));
  }

  deleteFromStorage() {
    for (var i = 0; i < imagesArr.length; i++){
      if (imagesArr[i].id === id) {
        var oldPhoto = imagesArr.splice(i, 1);
        localStorage.setItem('photos', JSON.stringify(imagesArr));
      }
    }
  }
  // updatePhoto()
}
