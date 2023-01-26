import PropTypes from 'prop-types';

import { CarType } from './Car';

/**
 * Ответ api/v1/offers/search
 * с аргументами `company_id и `zone_name`
 */
export const CompanySearchResponseType = {
  /**
   * Результат ответа
   * может быть 'ok' или что то еще
   * TODO: уточнить варианты
   */
  result: PropTypes.oneOf(['ok']),

  /** ?? */
  payload: PropTypes.shape({
    /** Список машин */
    items: PropTypes.arrayOf(CarType),

    /** ??? */
    rent_min: PropTypes.number,

    /** ??? */
    rent_max: PropTypes.number,

    /** ??? */
    call_line_enabled: PropTypes.bool,

    /** ??? */
    call_line_operator: PropTypes.string,

    /** Текущая страница выдачи */
    current_page: PropTypes.number,

    /** Количество объявлений на странице */
    page_size: PropTypes.number,

    /** Количество страниц */
    total_pages: PropTypes.number,

    /** Общее количество объявлений */
    total_items: PropTypes.number
  }),

  /** ?? */
  meta: PropTypes.shape({
    query_args: PropTypes.object
  })
};
