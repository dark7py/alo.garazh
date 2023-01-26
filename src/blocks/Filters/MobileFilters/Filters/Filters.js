import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import FullscreenModal from 'components/ModalFullScreenMobile';
import RangeRent from 'components/ui-kit/RangeRent';
import MultySelect from 'components/ui-kit/MultySelect';
import CheckBox from 'components/ui-kit/CheckBox';
import ButtonGroup from 'components/ui-kit/ButtonGroup';
import Button from 'components/ui-kit/Button';
import CustomSelect from 'components/ui-kit/Select';

import {
  filters as configFilters,
  sorting as configSorting
} from 'blocks/Filters/config';
import ParkSelector from 'blocks/ParkSelector';

import TumblerButton from './TumblerButton';

import Header from '../Header';

const reactSelectStyle = {
  control: (provide, state) => ({
    ...provide,
    width: '100%',
    borderRadius: 8,
    minHeight: 42,
    fontSize: 16,
    boxShadow: null,
    opacity: state.isDisabled ? 0.5 : 1,
    borderColor: '#cccccc',
    '&:hover': {
      borderColor: '#cccccc'
    }
  }),
  indicatorSeparator: () => null
};

class Filters extends PureComponent {
  onChangeRent = (e) => {
    const { setDailyRent } = this.props;

    setDailyRent({
      min: e[0].toString(),
      max: e[1].toString()
    });
  };

  onChangeList = (id) => (event) => {
    const { changeFiltersList } = this.props;
    changeFiltersList(event, id);
  };

  onChangeIncluded = (id) => () => {
    const { changeIncluded } = this.props;
    changeIncluded({ target: { id } });
  };

  render() {
    const {
      dailyRent, toggleFilters, filtersList, conditions, included, clearFilters,
      noCommission, changeCommission, save, noDeposit, changeConditions,
      changeNoDeposit, carBrandsOptions, changeBrand, carModelsOptions,
      changeModel, brand, model, isEmptyFilters, sorting, changeSorting,
      selfEmployed, changeSelfEmployed
    } = this.props;

    const onChangeSorting = (event) => {
      changeSorting(event.target.id);
    };

    return (
      <FullscreenModal closeModal={toggleFilters}>
        <Header closeModal={toggleFilters} save={save} />
        <div className="mobile-filters__container">
          <div className="mobile-filters__group">
            Сортировать
          </div>
          <div className="mobile-filters__item">
            <CustomSelect
              value={sorting}
              onChange={onChangeSorting}
              options={configSorting}
            />
          </div>
          <div className="mobile-filters__group">
            Стоимость аренды
          </div>
          <div className="mobile-filters__range-rent">
            <RangeRent
              min={dailyRent.min || '0'}
              max={dailyRent.max || '10000'}
              step={100}
              priceMin={0}
              priceMax={10000}
              onChange={this.onChangeRent}
            />
          </div>
          <div className="mobile-filters__item">
            <MultySelect
              value={filtersList.classes}
              options={configFilters.classes}
              onChange={this.onChangeList('classes')}
            >
              Тариф
            </MultySelect>
          </div>
          <div className="mobile-filters__item">
            <CheckBox
              id="no_deposit"
              onChange={changeNoDeposit}
              isChecked={noDeposit}
            >
              Без залога
            </CheckBox>
          </div>
          <div className="mobile-filters__item">
            <CheckBox
              id="no_commission"
              onChange={changeCommission}
              isChecked={noCommission}
            >
              Без комиссии
            </CheckBox>
          </div>
          <div className="mobile-filters__group">
            Характеристики
          </div>
          <div className="mobile-filters__item">
            <ButtonGroup
              value={filtersList.gearbox}
              options={configFilters.gearbox}
              onChange={this.onChangeList('gearbox')}
            />
          </div>
          <div className="mobile-filters__item">
            <ButtonGroup
              value={filtersList.fueltypes}
              options={configFilters.fueltypes}
              onChange={this.onChangeList('fueltypes')}
            />
          </div>
          <div className="mobile-filters__item">
            <Select
              options={carBrandsOptions}
              styles={reactSelectStyle}
              value={brand}
              onChange={changeBrand}
              placeholder="Марка"
              isClearable
              noOptionsMessage={() => 'Не найдено'}
            />
          </div>
          <div className="mobile-filters__item">
            <Select
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
          <div className="mobile-filters__group">
            Дополнительно
          </div>
          <div className="mobile-filters__park-selector">
            <ParkSelector />
          </div>
          <TumblerButton
            id="branded"
            onChange={changeConditions}
            isActive={conditions.includes('branded')}
          >
            Фирменная оклейка
          </TumblerButton>
          <TumblerButton
            id="yellow_numbers"
            onChange={changeConditions}
            isActive={conditions.includes('yellow_numbers')}
          >
            Жёлтые номера
          </TumblerButton>
          <TumblerButton
            id="baby_chair"
            onChange={changeConditions}
            isActive={conditions.includes('baby_chair')}
          >
            Детское кресло
          </TumblerButton>
          <TumblerButton
            id="self_employed"
            onChange={changeSelfEmployed}
            isActive={selfEmployed}
          >
            Работает с самозанятыми
          </TumblerButton>
          <div className="mobile-filters__group">
            Условия аренды
          </div>
          <div className="mobile-filters__item">
            <MultySelect
              value={filtersList.min_rental_period}
              options={configFilters.min_rental_period}
              onChange={this.onChangeList('min_rental_period')}
            >
              Минимальный срок аренды
            </MultySelect>
          </div>
          <div className="mobile-filters__item">
            <MultySelect
              value={filtersList.schedule}
              options={configFilters.schedule}
              onChange={this.onChangeList('schedule')}
            >
              График
            </MultySelect>
          </div>
          <TumblerButton
            id="buyout_is_possible"
            onChange={this.onChangeIncluded('buyout_is_possible')}
            isActive={included.includes('buyout_is_possible')}
          >
            Возможность выкупить авто
          </TumblerButton>
          {
            !isEmptyFilters && (
              <div className="mobile-filters__button-container">
                <Button theme="white" onClick={clearFilters}>Сбросить</Button>
              </div>
            )
          }
        </div>
      </FullscreenModal>
    );
  }
}

Filters.propTypes = {
  dailyRent: PropTypes.node.isRequired,
  filtersList: PropTypes.shape({
    classes: PropTypes.arrayOf(PropTypes.string),
    gearbox: PropTypes.string,
    fueltypes: PropTypes.string,
    min_rental_period: PropTypes.number,
    schedule: PropTypes.string,
    commission: PropTypes.number
  }).isRequired,
  conditions: PropTypes.arrayOf(PropTypes.string).isRequired,
  carBrandsOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })).isRequired,
  carModelsOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })).isRequired,
  brand: PropTypes.string,
  model: PropTypes.string,
  included: PropTypes.bool,
  noCommission: PropTypes.bool,
  noDeposit: PropTypes.bool,
  isEmptyFilters: PropTypes.bool.isRequired,
  sorting: PropTypes.string.isRequired,
  changeIncluded: PropTypes.func.isRequired,
  changeFiltersList: PropTypes.func.isRequired,
  setDailyRent: PropTypes.func.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  changeSorting: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  changeCommission: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  changeConditions: PropTypes.func.isRequired,
  changeNoDeposit: PropTypes.func.isRequired,
  changeBrand: PropTypes.func.isRequired,
  changeModel: PropTypes.func.isRequired,
  selfEmployed: PropTypes.bool,
  changeSelfEmployed: PropTypes.func.isRequired
};

Filters.defaultProps = {
  brand: null,
  model: null,
  included: false,
  noCommission: false,
  noDeposit: false,
  selfEmployed: false
};

export default Filters;
