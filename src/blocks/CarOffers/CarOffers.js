import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroller';

import Loader from 'components/Loader';
import Button from 'components/ui-kit/Button';

import { CarType } from 'types';

import CarOffer from '../CarOffer';

import './CarOffer.scss';

class CarOffers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }

  static getDerivedStateFromProps(props, state) {
    return !props.cars ? ({ page: 1 }) : state;
  }

  // не перерисовываем если изменилась страница
  shouldComponentUpdate(nextProps, nextState) {
    const { page } = this.state;
    return nextState.page === page;
  }

  onScrollFetch = (currentPage) => {
    const { fetchCars } = this.props;
    const nextPage = currentPage + 1;
    fetchCars(nextPage);
    this.setState({ page: nextPage });
  };

  onButtonFetch = () => {
    const { page } = this.state;
    const { fetchCars } = this.props;
    const nextPage = page + 1;
    fetchCars(nextPage);

    this.setState({ page: nextPage });
  };

  render() {
    const {
      cars, showPark,
      noMoreCars, backLocation
    } = this.props;

    const { page } = this.state;

    const isHasMore = !noMoreCars && !!(page % 2);
    const isShowMoreButton = !noMoreCars && !isHasMore;

    return (
      <div className="car-offers">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.onScrollFetch}
          hasMore={isHasMore}
          loader={<Loader key={0} />}
        >
          {cars.map((carOffer) => (
            <CarOffer
              key={carOffer.id}
              carOffer={carOffer}
              showPark={showPark}
              backLocation={backLocation}
            />
          ))}
        </InfiniteScroll>
        {
          isShowMoreButton && (
            <Button
              theme="white"
              onClick={this.onButtonFetch}
            >
              Показать еще
            </Button>
          )
        }
      </div>
    );
  }
}

CarOffers.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape(CarType)
  ),
  showPark: PropTypes.bool,
  fetchCars: PropTypes.func.isRequired,
  noMoreCars: PropTypes.bool,
  backLocation: PropTypes.objectOf(PropTypes.node)
};

CarOffers.defaultProps = {
  cars: null,
  showPark: false,
  noMoreCars: false,
  backLocation: null
};

export default CarOffers;
