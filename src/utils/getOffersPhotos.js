export const getOffersPhotos = (img, photos) => {
  const items = photos.map((photo) => {
    if (!photo.resolutions.length) {
      return ({
        original: img,
        thumbnail: img,
        mobile: img
      });
    }

    return ({
      original: photo.resolutions[2].url,
      thumbnail: photo.resolutions[0].url,
      mobile: photo.resolutions[2].url
    });
  });

  if (items.length === 0) {
    items.push({
      original: img,
      thumbnail: img,
      mobile: img,
      isDefault: true
    });
  }

  return items;
};
