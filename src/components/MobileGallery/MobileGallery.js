import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LazyLoadImage from 'components/LazyLoadImage';
import './MobileGallery.scss';

class MobileGallery extends React.PureComponent {
    renderItem = (item, index) => {
      const { images } = this.props;
      const singleImage = images.length === 1;
      return (
        <div
          key={index}
          className={cn({
            ListingItemGallery__item: true,
            ListingItemGallery__item_first: index === 0,
            ListingItemGallery__item_last: index === images.length - 1
          })}
        >
          {this.renderItemContent(item, singleImage)}
        </div>
      );
    };

    renderItemContent = (item) => {
      const { link, linkState, alt } = this.props;

      if (link) {
        return (
          <Link
            className="ListingItemGallery__itemLink"
            to={{ pathname: link, state: linkState }}
          >
            <LazyLoadImage
              className="ListingItemGallery__itemImage"
              src={item.mobile}
              previewSrc={item.thumbnail}
              alt={alt}
            />
          </Link>
        );
      }
      // NOTE: LazyImage с blur очень сильно тормозит на мобилках
      return (
        <div className="ListingItemGallery__itemLink">
          <LazyLoadImage
            className="ListingItemGallery__itemImage"
            src={item.mobile}
            previewSrc={item.thumbnail}
            alt={alt}
          />
        </div>
      );
    };

    render() {
      const { size, images } = this.props;

      const singleImage = images.length === 1;

      return (
        <div
          className={cn(
            'ListingItemGallery',
            `ListingItemGallery_size_${size}`,
            { 'ListingItemGallery__single-image': singleImage }
          )}
        >
          {images.map(this.renderItem, this)}
          {!singleImage
              && <div className="ListingItemGallery__spacer" />}
        </div>
      );
    }
}

MobileGallery.SIZE = {
  BIG: 'BIG',
  REGULAR: 'REGULAR'
};

MobileGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    original: PropTypes.string,
    thumbnail: PropTypes.string,
    mobile: PropTypes.string
  })).isRequired,
  size: PropTypes.oneOf(['BIG', 'REGULAR']),
  link: PropTypes.string,
  linkState: PropTypes.oneOfType(
    [PropTypes.objectOf(PropTypes.node), PropTypes.bool]
  ),
  alt: PropTypes.string.isRequired
};

MobileGallery.defaultProps = {
  size: MobileGallery.SIZE.BIG,
  link: null,
  linkState: false
};

export default MobileGallery;
