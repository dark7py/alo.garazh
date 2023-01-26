export const getImages = (photos, img, alt) => {
  const images = photos.map((photo) => ({
    original: photo.url,
    thumbnail: photo.resolutions[0] ? photo.resolutions[0].url : photo.url,
    mobile: photo.url,
    originalAlt: alt,
    thumbnailAlt: `Превью ${alt}`
  }));

  const isDefaultImg = images.length === 0;
  const defaultImage = img.replace('.png', '@2x.png');

  if (isDefaultImg) {
    images.push({
      original: defaultImage,
      thumbnail: defaultImage,
      mobile: defaultImage,
      originalAlt: alt,
      thumbnailAlt: `Превью ${alt}`
    });
  }

  return { images, isDefaultImg };
};
