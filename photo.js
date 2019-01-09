class Photo {
  constructor(title, caption, id, file, favorite) {
    this.title = title;
    this.caption = caption;
    this.id = id;
    this.file = file;
    this.favorite = favorite || false;
  }
  saveToStorage(imagesArr) {
    localStorage.setItem('photos', JSON.stringify(imagesArr));
  }

  deleteFromStorage(idx, array) {
    array.splice(idx, 1);
    this.saveToStorage(array);
  }
    
  static updatePhoto(id, type, newContent) {
    imagesArr.forEach(function(photo) {
      if (photo.id === id){
      photo[type] = newContent;
      }
     localStorage.setItem('photos', JSON.stringify(imagesArr));     
    })
  }
}