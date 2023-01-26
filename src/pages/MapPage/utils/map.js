export const getPoint = (point) => {
  const { latitude, longitude, ...rest } = point;
  return new window.ymaps.Placemark(
    {
      type: 'Point',
      coordinates: [latitude, longitude]
    },
    { ...rest }
  );
};

export const getClusterIcons = (name) => [{
  href: `/images/${name}.png`,
  size: [40, 40],
  // Отступ, чтобы центр картинки совпадал с центром кластера.
  offset: [-20, -20]
}, {
  href: `/images/${name}.png`,
  size: [60, 60],
  offset: [-30, -30],
  // Можно задать геометрию активной области метки.
  // Если геометрия не задана, активной областью будет
  // прямоугольник.
  shape: {
    type: 'Circle',
    coordinates: [0, 0],
    radius: 30
  }
}];
