import React from 'react';
import PropTypes from 'prop-types';

import classname from 'classnames';

import './Header.scss';

import { SearchDesktop } from 'blocks/Search';
import Button from 'components/ui-kit/Button';

import Logo from './Logo';
import User from './User';
import CityButton from './CityButton';

const Header = (props) => {
  const {
    userType,
    isMobile,
    isTaxiparkDraft,
    isMainPage
  } = props;

  return (
    <div className="header__container">
      <header className="header">
        <Logo />
        {
          userType === 'TAXIPARK' && (
            <div className="taxiparks_buttons">
              {
                !isMobile && (
                  <a
                    href="/taxiparks/offers/create"
                    className="taxiparks_button"
                  >
                    <Button>
                      Сдать такси
                    </Button>
                  </a>
                )
              }
              <a
                href="/taxiparks"
                className={classname({
                  taxiparks_button: true,
                  'taxiparks_button--alert': isTaxiparkDraft
                })}
              >
                <Button theme="gray">
                  Личный кабинет
                </Button>
              </a>
            </div>
          )
        }
        {
          userType !== 'TAXIPARK' && isMainPage && (
            <SearchDesktop />
          )
        }
        <div className="header__buttons">
          <CityButton />
          <User />
        </div>
      </header>
    </div>
  );
};

Header.propTypes = {
  userType: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isTaxiparkDraft: PropTypes.bool,
  isMainPage: PropTypes.bool.isRequired
};

Header.defaultProps = {
  isTaxiparkDraft: false
};

export default Header;
