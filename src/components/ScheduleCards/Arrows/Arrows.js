import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Arrows.scss';

const Arrows = (props) => {
  const {
    scrollRight,
    scrollLeft,
    showArrowsByHover
  } = props;

  const classNames = classnames({
    'schedule-arrows': true,
    'schedule-arrows--show-by-hover': showArrowsByHover
  });

  return (
    <div className={classNames}>
      <button
        className="schedule-arrow"
        onClick={scrollRight}
        type="button"
      />
      <button
        className="schedule-arrow schedule-arrow--left"
        onClick={scrollLeft}
        type="button"
      />
    </div>
  );
};

Arrows.propTypes = {
  scrollRight: PropTypes.func.isRequired,
  scrollLeft: PropTypes.func.isRequired,
  showArrowsByHover: PropTypes.bool
};

Arrows.defaultProps = {
  showArrowsByHover: false
};

export default Arrows;
