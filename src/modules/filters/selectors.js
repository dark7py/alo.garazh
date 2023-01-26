import { createSelector } from 'reselect';
import { getLocation } from 'connected-react-router';

import {
  getCarBrands,
  getCarBrandsDirectory
} from 'modules/data/selectors';
import {
  getQuery,
  getUrlParams
} from 'modules/router/selectors';
import { getCityId } from 'modules/ui/selectors';
import { composeCarsURL } from 'modules/router/utils';

import { queryToApiURL } from 'modules/filters/utils';
import filtersConfig from 'modules/filters/config';

export const brandCodeSelector = createSelector(
  getUrlParams,
  (params) => params && params.brand
);

export const modelCodeSelector = createSelector(
  getUrlParams,
  (params) => params && params.model
);

export const parkSelector = createSelector(
  getUrlParams,
  (params) => params && params.park
);

export const brandOptionSelector = createSelector(
  getCarBrandsDirectory,
  brandCodeSelector,
  (carBrands, brandCode) => {
    if (!brandCode) {
      return null;
    }

    const brand = carBrands && carBrands[brandCode];

    if (!brand) {
      return null;
    }

    return ({
      value: brand.id,
      label: brand.name,
      models: brand.models
    });
  }
);

export const modelOptionSelector = createSelector(
  brandOptionSelector,
  modelCodeSelector,
  (brandOption, modelCode) => {
    if (!brandOption || !modelCode) {
      return null;
    }

    const model = brandOption.models
      .find((item) => item.code.toLowerCase() === modelCode);

    if (!model) {
      return null;
    }

    return ({
      value: model.id,
      label: model.name
    });
  }
);

export const mainPageCanonicalURLSelector = createSelector(
  brandOptionSelector,
  modelOptionSelector,
  parkSelector,
  getUrlParams,
  getQuery,
  (brandOption, modelOption, park, params, query) => {
    const host = process.env.APP_HOST || '';
    const { city, brand, model } = params;

    if (park) {
      return composeCarsURL({ host, city, park });
    }

    if (brand && !brandOption) {
      return composeCarsURL({ host, city });
    }
    if (model && !modelOption) {
      return composeCarsURL({ host, city, brand });
    }
    if (query && Object.keys(query).length > 0) {
      return composeCarsURL({ ...params, host });
    }
    return null;
  }
);

export const brandNameSelector = createSelector(
  brandOptionSelector,
  (brandOption) => brandOption && brandOption.label
);

export const modelNameSelector = createSelector(
  modelOptionSelector,
  (modelOption) => modelOption && modelOption.label
);

export const brandValueSelector = createSelector(
  brandOptionSelector,
  (option) => option && option.value
);

export const modelValueSelector = createSelector(
  modelOptionSelector,
  (option) => option && option.value
);

export const filtersSelector = createSelector(
  getQuery,
  brandValueSelector,
  modelValueSelector,
  parkSelector,
  (query, brandId, modelId, park) => {
    const splittedQuery = Object.keys(query).reduce((acc, key) => {
      acc[key] = filtersConfig[key] ? query[key].split(',') : query[key];
      return acc;
    }, {});

    if (park) {
      return ({
        ...splittedQuery,
        company_slug: park
      });
    }

    if (!brandId && !modelId) {
      return splittedQuery;
    }

    return ({
      ...splittedQuery,
      car_brand_id: brandId && `${brandId}`,
      car_model_id: modelId && `${modelId}`
    });
  }
);

export const dailyRentSelector = createSelector(
  filtersSelector,
  (filters) => ({
    min: filters.daily_rent_min || '',
    max: filters.daily_rent_max || ''
  })
);

export const filtersListSelector = createSelector(
  filtersSelector,
  (filters) => ({
    classes: filters.classes,
    gearbox: filters.gearbox,
    fueltypes: filters.fueltypes,
    min_rental_period: filters.min_rental_period,
    schedule: filters.schedule,
    commission: filters.commission
  })
);

export const conditionsSelector = createSelector(
  filtersSelector,
  (filters) => {
    if (filters.conditions) {
      return filters.conditions;
    }

    return [];
  }
);

export const includedSelector = createSelector(
  filtersSelector,
  (filters) => {
    if (filters.included) {
      return filters.included;
    }

    return [];
  }
);

export const certifiedSelector = createSelector(
  filtersSelector,
  (filters) => !!filters.certified
);

export const noDepositSelector = createSelector(
  filtersSelector,
  (filters) => filters.no_deposit
);

export const noCommissionSelector = createSelector(
  filtersSelector,
  (filters) => !!filters.no_commission
);

export const selfEmployedSelector = createSelector(
  filtersSelector,
  (filters) => !!filters.self_employed
);

export const searchStringSelector = createSelector(
  filtersSelector,
  (filters) => filters.search_string && decodeURI(filters.search_string)
);

export const sortingSelector = createSelector(
  filtersSelector,
  (filters) => {
    // if order by date, order and direction empty, only use order cost
    if (filters.order_by === 'cost') {
      return `${filters.order_by}_${filters.order_direction}`;
    }

    return 'default';
  }
);

export const brandIdSelector = createSelector(
  filtersSelector,
  (filters) => filters.car_brand_id
);

export const modelIdSelector = createSelector(
  filtersSelector,
  (filters) => filters.car_model_id
);

export const carBrandsOptionsSelector = createSelector(
  getCarBrands,
  (carBrands) => {
    if (carBrands) {
      return Object.keys(carBrands).map((key) => ({
        value: carBrands[key].id,
        label: carBrands[key].name
      }));
    }

    return [];
  }
);

export const carModelsOptionsSelector = createSelector(
  brandOptionSelector,
  (brand) => {
    if (brand) {
      return brand.models.map((model) => ({
        value: model.id,
        label: model.name
      }));
    }

    return [];
  }
);

export const filterApiUrlSelector = createSelector(
  filtersSelector,
  (filters) => queryToApiURL(filters)
);

export const isEmptyFiltersSelector = createSelector(
  filtersSelector,
  (filters) => !Object.keys(filters).length
);

export const urlComposerArgsSelector = createSelector(
  brandCodeSelector,
  modelCodeSelector,
  parkSelector,
  getCityId,
  getLocation,
  (brand, model, park, city, location) => ({
    city,
    brand,
    model,
    park,
    search: location.search
  })
);

export const mainPageURLSelector = createSelector(
  urlComposerArgsSelector,
  composeCarsURL
);

export const mapPageURLSelector = createSelector(
  urlComposerArgsSelector,
  (args) => composeCarsURL({ ...args, isMap: true })
);
