class Photo {
  constructor(title, caption, id, file) {
    this.title = title;
    this.caption = caption;
    this.id = id;
    this.file = file;
    this.favorite = false;
  }
  saveToStorage(imagesArr) {
    localStorage.setItem('photos', JSON.stringify(imagesArr));
  }

  deleteFromStorage() {
    // imagesArr.find(function(id) {
    //   if (id === this.id) {
    //     localStorage.removeItem(id);
    //   }
    // });
  }
  // updatePhoto() {
  // }
}
