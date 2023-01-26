import React from 'react';
import PropTypes from 'prop-types';

import Emoji from './Emoji';

import './Assessment.scss';

import config from '../config';

const types = Object.keys(config);

const Assessment = (props) => (
  <div className="assessment">
    {
        types.map((type) => {
          const onClick = () => {
            props.onClick(type);
          };

          return (
            <Emoji
              key={type}
              type={type}
              isActive={props.assessment === type}
              onClick={onClick}
              imgUrl={props.imgUrl}
            />
          );
        })
      }
  </div>
);

Assessment.propTypes = {
  onClick: PropTypes.func.isRequired,
  assessment: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired
};

export default Assessment;
