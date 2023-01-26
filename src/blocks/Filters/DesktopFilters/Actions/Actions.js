import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { Route, Switch } from 'react-router';

import Select from 'components/ui-kit/Select';

import NavLinks from './NavLinks';

import './Actions.scss';

import { sorting as configSorting } from '../../config';

const Actions = (props) => {
  const {
    toggleFiltersDesktop, isDesktopFiltersOpen, clearFilters,
    sorting, changeSorting, isEmptyFilters
  } = props;

  const className = classname({
    'desktop-filters__actions-toggle': true,
    'desktop-filters__actions-toggle_open': isDesktopFiltersOpen
  });

  const onChangeSorting = (event) => {
    changeSorting(event.target.id);
  };

  return (
    <div className="desktop-filters__actions">
      <div>
        <button
          className={className}
          onClick={toggleFiltersDesktop}
          type="button"
        >
          {
            isDesktopFiltersOpen
              ? 'Скрыть все фильтры'
              : 'Показать все фильтры'
          }
        </button>
        {
          !isEmptyFilters && (
            <button
              className="desktop-filters__actions-clear"
              type="button"
              onClick={clearFilters}
            >
              Сбросить
            </button>
          )
        }
      </div>
      <div className="desktop-filters__actions-right">
        <div className="desktop-filters__actions-select">
          <Switch>
            <Route exact path="/map" render={() => null} />
            <Route
              path="/*"
              render={() => (
                <Select
                  value={sorting}
                  onChange={onChangeSorting}
                  options={configSorting}
                />
              )}
            />
          </Switch>
        </div>
        <NavLinks />
      </div>
    </div>
  );
};

Actions.propTypes = {
  toggleFiltersDesktop: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  changeSorting: PropTypes.func.isRequired,
  isDesktopFiltersOpen: PropTypes.bool.isRequired,
  sorting: PropTypes.string.isRequired,
  isEmptyFilters: PropTypes.bool.isRequired
};

export default Actions;
