import React from 'react';
import PropTypes from 'prop-types';

const Emoji = (props) => {
  const {
    imgUrl, type, isActive, onClick
  } = props;

  const activeClassName = isActive ? 'assessment__emoji--active' : '';
  const className = `assessment__emoji ${activeClassName}`;
  const style = {
    backgroundImage: `url(${imgUrl}/${type}.svg`
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={style}
    />
  );
};

Emoji.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'angry', 'happy', 'smile', 'upset', 'whatever'
  ]).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Emoji;
