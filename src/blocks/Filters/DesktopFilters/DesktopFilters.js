import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import Select from 'react-select';

import CheckBox from 'components/ui-kit/CheckBox';
import InputRent from 'components/ui-kit/InputRent';
import MultySelect from 'components/ui-kit/MultySelect';
import ButtonGroup from 'components/ui-kit/ButtonGroup';
import ParkSelector from 'blocks/ParkSelector';

import { filters as configFilters } from '../config';
import Actions from './Actions';

import './DesktopFilters.scss';

const itemCheckboxClass = classname(
  'desktop-filters__item',
  'desktop-filters__item--checkbox'
);

const reactSelectStyle = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#f4f4f4' : 'white',
    color: '#2d2d2d'
  }),
  control: (provide, state) => ({
    ...provide,
    width: '100%',
    minWidth: '167px',
    borderRadius: 8,
    minHeight: 42,
    fontSize: 14,
    boxShadow: null,
    opacity: state.isDisabled ? 0.5 : 1,
    background: '#FFFFFF',
    borderColor: '#cccccc',
    '&:hover': {
      borderColor: '#cccccc'
    }
  }),
  indicatorSeparator: () => null
};

class DesktopFilters extends PureComponent {
  containerClass = () => {
    const { isDesktopFiltersOpen } = this.props;
    return classname({
      'desktop-filters': true,
      'desktop-filters--open': isDesktopFiltersOpen
    });
  };

  wrapperWithHideClass = (flexStart) => {
    const { isDesktopFiltersOpen } = this.props;
    return classname({
      'desktop-filters__row': true,
      'desktop-filters__row--flex-start': flexStart,
      'desktop-filters__row--hide': !isDesktopFiltersOpen
    });
  };

  toggleFiltersDesktop = () => {
    const { isDesktopFiltersOpen, setIsDesktopFiltersOpen } = this.props;

    setIsDesktopFiltersOpen(!isDesktopFiltersOpen);
  };

  onChangeList = (id) => (value) => {
    const { changeFiltersList } = this.props;
    changeFiltersList(value, id);
  };

  onChangeCondition = (id) => () => {
    const { changeConditions } = this.props;
    changeConditions(id);
  };

  render() {
    const {
      dailyRent, setDailyRent, filtersList, conditions,
      included, changeIncluded, clearFilters, noDeposit, changeNoDeposit, changeCommission,
      sorting, changeSorting, carBrandsOptions, changeBrand, carModelsOptions,
      changeModel, brand, model, isEmptyFilters, noCommission, selfEmployed,
      changeSelfEmployed, isDesktopFiltersOpen
    } = this.props;

    return (
      <div className={this.containerClass()}>
        <div className="desktop-filters__row">
          <div className="desktop-filters__item">
            <InputRent
              min={dailyRent.min}
              max={dailyRent.max}
              onChange={setDailyRent}
            />
          </div>
          <div className="desktop-filters__item desktop-filters__item--classes">
            <MultySelect
              value={filtersList.classes}
              options={configFilters.classes}
              onChange={this.onChangeList('classes')}
            >
              Тариф
            </MultySelect>
          </div>
          <div className="desktop-filters__item">
            <ButtonGroup
              value={filtersList.gearbox}
              options={configFilters.gearbox}
              onChange={this.onChangeList('gearbox')}
            />
          </div>
          <div
            className="desktop-filters__item desktop-filters__item--fueltypes"
          >
            <ButtonGroup
              value={filtersList.fueltypes}
              options={configFilters.fueltypes}
              onChange={this.onChangeList('fueltypes')}
            />
          </div>
        </div>
        <div className="desktop-filters__row">
          <div className="desktop-filters__item">
            <Select
              instanceId="select-brands"
              options={carBrandsOptions}
              styles={reactSelectStyle}
              value={brand}
              onChange={changeBrand}
              placeholder="Марка"
              isClearable
              noOptionsMessage={() => 'Не найдено'}
            />
          </div>
          <div className="desktop-filters__item">
            <Select
              instanceId="select-models"
              options={carModelsOptions}
              onChange={changeModel}
              value={model}
              styles={reactSelectStyle}
              isDisabled={!carModelsOptions.length}
              placeholder="Модель"
              isClearable
              noOptionsMessage={() => 'Не найдено'}
            />
          </div>
          <div className={itemCheckboxClass}>
            <CheckBox
              id="no_commission"
              onChange={changeCommission}
              isChecked={noCommission}
            >
              Без комиссии
            </CheckBox>
          </div>
          <div className={itemCheckboxClass}>
            <CheckBox
              id="no_deposit"
              onChange={changeNoDeposit}
              isChecked={noDeposit}
            >
              Без залога
            </CheckBox>
          </div>
          <div className={itemCheckboxClass}>
            <CheckBox
              id="branded"
              onChange={this.onChangeCondition('branded')}
              isChecked={conditions.includes('branded')}
            >
              Фирменная оклейка
            </CheckBox>
          </div>
          <div className={itemCheckboxClass}>
            <CheckBox
              id="baby_chair"
              onChange={this.onChangeCondition('baby_chair')}
              isChecked={conditions.includes('baby_chair')}
            >
              Детское кресло
            </CheckBox>
          </div>
          <div className={itemCheckboxClass}>
            <CheckBox
              id="self_employed"
              onChange={changeSelfEmployed}
              isChecked={selfEmployed}
            >
              Для самозанятых
            </CheckBox>
          </div>
        </div>
        <div className={this.wrapperWithHideClass(true)}>
          <div
            className="desktop-filters__item desktop-filters__item--checkbox"
          >
            <CheckBox
              id="buyout_is_possible"
              onChange={changeIncluded}
              isChecked={included.includes('buyout_is_possible')}
            >
              Возможность выкупить авто
            </CheckBox>
          </div>
          <div className="desktop-filters__item desktop-filters__item--checkbox">
            <CheckBox
              id="yellow_numbers"
              onChange={this.onChangeCondition('yellow_numbers')}
              isChecked={conditions.includes('yellow_numbers')}
            >
              Желтые номера
            </CheckBox>
          </div>
        </div>
        <div className={this.wrapperWithHideClass()}>
          <div className="desktop-filters__park-selector">
            <ParkSelector />
          </div>
          <div
            className="desktop-filters__item desktop-filters__item--rent"
          >
            <MultySelect
              value={filtersList.min_rental_period}
              options={configFilters.min_rental_period}
              onChange={this.onChangeList('min_rental_period')}
            >
              Минимальный срок аренды
            </MultySelect>
          </div>
          <div
            className="desktop-filters__item desktop-filters__item--schedule"
          >
            <MultySelect
              value={filtersList.schedule}
              options={configFilters.schedule}
              onChange={this.onChangeList('schedule')}
            >
              График
            </MultySelect>
          </div>
        </div>
        <Actions
          toggleFiltersDesktop={this.toggleFiltersDesktop}
          isDesktopFiltersOpen={isDesktopFiltersOpen}
          clearFilters={clearFilters}
          sorting={sorting}
          changeSorting={changeSorting}
          isEmptyFilters={isEmptyFilters}
        />
      </div>
    );
  }
}

DesktopFilters.propTypes = {
  dailyRent: PropTypes.shape({
    min: PropTypes.string,
    max: PropTypes.string
  }).isRequired,
  filtersList: PropTypes.shape({
    classes: PropTypes.arrayOf(PropTypes.string),
    gearbox: PropTypes.arrayOf(PropTypes.string),
    fueltypes: PropTypes.arrayOf(PropTypes.string),
    min_rental_period: PropTypes.number,
    schedule: PropTypes.string,
    commission: PropTypes.number
  }).isRequired,
  conditions: PropTypes.arrayOf(PropTypes.string).isRequired,
  carBrandsOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })).isRequired,
  carModelsOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })).isRequired,
  included: PropTypes.arrayOf(PropTypes.string).isRequired,
  brand: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  }),
  model: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  }),
  noCommission: PropTypes.bool,
  noDeposit: PropTypes.bool,
  selfEmployed: PropTypes.bool,
  isEmptyFilters: PropTypes.bool.isRequired,
  sorting: PropTypes.string.isRequired,
  changeIncluded: PropTypes.func.isRequired,
  changeFiltersList: PropTypes.func.isRequired,
  setDailyRent: PropTypes.func.isRequired,
  changeSorting: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  changeCommission: PropTypes.func.isRequired,
  changeConditions: PropTypes.func.isRequired,
  changeNoDeposit: PropTypes.func.isRequired,
  changeBrand: PropTypes.func.isRequired,
  changeModel: PropTypes.func.isRequired,
  changeSelfEmployed: PropTypes.func.isRequired,
  park: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string
  }),
  isDesktopFiltersOpen: PropTypes.bool.isRequired,
  setIsDesktopFiltersOpen: PropTypes.func.isRequired
};

DesktopFilters.defaultProps = {
  brand: null,
  model: null,
  park: null,
  noCommission: false,
  noDeposit: false,
  selfEmployed: false
};

export default DesktopFilters;
