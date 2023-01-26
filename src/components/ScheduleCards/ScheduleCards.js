import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RentalCard from './RentalCard';
import PieceworkCard from './PieceworkCard';

import Arrows from './Arrows';

import './ScheduleCards.scss';

class ScheduleCards extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();

    this.state = {
      showArrows: false
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const showArrows = this.props.showArrows && this.scrollRef.current
      && this.scrollRef.current.scrollWidth > this.scrollRef.current.offsetWidth;

    this.setState({ showArrows });
  }

  scrollLeft = () => {
    const { scrollLeft } = this.scrollRef.current;
    this.scrollRef.current.scroll(scrollLeft - 180, 0);
  };

  scrollRight = () => {
    const { scrollLeft } = this.scrollRef.current;
    this.scrollRef.current.scroll(scrollLeft + 180, 0);
  };

  render() {
    const {
      carId,
      scheduleRental,
      schedulePiecework,
      minRentalPeriod,
      dailyRent,
      depositCost,
      currency,
      commission,
      showArrowsByHover,
      completedCallDate
    } = this.props;

    const buttonText = completedCallDate ? 'Перезвонить' : 'Позвонить';

    const { showArrows } = this.state;

    const isOldSchedule = (!scheduleRental || !scheduleRental.length)
      && (!schedulePiecework || !schedulePiecework.length);

    const scheduleRentalList = isOldSchedule
      ? [{
        min_rental_period: minRentalPeriod,
        cost_per_day: dailyRent,
        deposit_amount: depositCost,
        schedule_kind: 'six_days_per_week',
        commission
      }]
      : scheduleRental;

    return (
      <div className="schedule_cards">
        <div
          ref={this.scrollRef}
          className="schedule_cards_wrapper"
        >
          {
            scheduleRentalList && scheduleRentalList
              .map((schedule) => (
                <RentalCard
                  key={schedule.schedule_kind}
                  carId={carId}
                  scheduleKind={schedule.schedule_kind}
                  costPerDay={schedule.cost_per_day}
                  depositAmount={schedule.deposit_amount}
                  currency={currency}
                  commission={schedule.commission}
                  minRentalPeriod={schedule.min_rental_period}
                  buttonText={buttonText}
                />
              ))
          }
          {
            schedulePiecework && schedulePiecework.map((schedule) => (
              <PieceworkCard
                key={schedule.schedule_kind}
                carId={carId}
                scheduleKind={schedule.schedule_kind}
                salary={schedule.salary}
                currency={currency}
                minOrderAmount={schedule.min_order_amount}
                buttonText={buttonText}
              />
            ))
          }
        </div>
        {
          showArrows && (
            <Arrows
              showArrowsByHover={showArrowsByHover}
              scrollLeft={this.scrollLeft}
              scrollRight={this.scrollRight}
            />
          )
        }
      </div>
    );
  }
}

ScheduleCards.propTypes = {
  carId: PropTypes.number.isRequired,
  scheduleRental: PropTypes.arrayOf(PropTypes.shape({
    schedule_kind: PropTypes.string.isRequired,
    cost_per_day: PropTypes.number.isRequired,
    deposit_amount: PropTypes.number.isRequired,
    min_rental_period: PropTypes.number.isRequired,
    commission: PropTypes.number
  })),
  schedulePiecework: PropTypes.arrayOf(PropTypes.shape({
    schedule_kind: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    deposit_amount: PropTypes.number,
    min_order_amount: PropTypes.number
  })),
  minRentalPeriod: PropTypes.number,
  dailyRent: PropTypes.number,
  depositCost: PropTypes.number,
  currency: PropTypes.string,
  commission: PropTypes.number,
  showArrowsByHover: PropTypes.bool,
  showArrows: PropTypes.bool,
  completedCallDate: PropTypes.string
};

ScheduleCards.defaultProps = {
  scheduleRental: [],
  schedulePiecework: [],
  minRentalPeriod: 7,
  dailyRent: 0,
  depositCost: 0,
  currency: 'RUB',
  commission: 0,
  showArrowsByHover: false,
  showArrows: false,
  completedCallDate: null
};

export default ScheduleCards;
