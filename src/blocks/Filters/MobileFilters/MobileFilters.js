import React, { PureComponent } from 'react';

import { SearchMobile } from 'blocks/Search';
import Button from 'components/ui-kit/Button';

import Filters from './Filters';
import NavLinks from './NavLinks';

import './MobileFilters.scss';

class MobileFilters extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggleFilters = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <>
        <SearchMobile />
        <div className="mobile-filters">
          <div className="mobile-filter-button">
            <Button
              theme="white"
              iconUrl="/images/icon-filter.svg"
              onClick={this.toggleFilters}
            >
              Параметры
            </Button>
          </div>
          <NavLinks />
        </div>
        {isOpen && (
          <Filters
            toggleFilters={this.toggleFilters}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...this.props}
          />
        )}
      </>
    );
  }
}

export default MobileFilters;
