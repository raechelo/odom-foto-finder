class Photo {
  constructor(title, caption, id, file, favorite) {
    this.title = title;
    this.caption = caption;
    this.id = id;
    this.file = file;
    this.favorite = false;
  }
  saveToStorage(imagesArr) {
      
    localStorage.setItem('photos', JSON.stringify(imagesArr));
  }

  static deleteFromStorage(id) {
    console.log(id)
    // imagesArr.forEach(function(pic) {
      if (true) {
        console.log('green')
        imagesArr.splice(id, 1);
        console.log(imagesArr)
        // localStorage.removeItem(id);
        localStorage.setItem('photos', JSON.stringify(imagesArr));
      }
    }
  // }
  // updatePhoto() {
  // }
}
