/* eslint-disable camelcase, react/jsx-props-no-spreading, react/destructuring-assignment */
import React from 'react';

import { CarType } from 'types';

import ScheduleCards from 'components/ScheduleCards';

import { getImageAltText } from 'utils';

import CarGallery from './components/CarGallery';
import ParkList from './components/Lists/ParkList';
import BonusesList from './components/Lists/BonusesList';
import CarTitleWithYear from './components/CarTitleWithYear';
import ParkComment from './components/ParkComment';
import Specifications from './components/Specifications';
import Additionally from './components/Additionally';
import RentTerms from './components/RentTerms';
import Counters from './components/Counters';
import WorkTime from '../../../../components/WorkTime';

import './CarMain.scss';

const CarMain = (props) => {
  const {
    carBrand,
    carModel,
    directories,
    year
  } = props;

  const carTitle = `${carBrand.name} ${carModel.name}`;

  const scheduleNames = props.schedule && props.schedule.map((el) => {
    if (!directories.schedule_list || !directories.schedule_list[el]) {
      return [];
    }

    return directories.schedule_list[el].name;
  });

  const minRentalPeriod = (props.scheduleRental && props.scheduleRental.length)
    && (props.scheduleRental[0].min_rental_period || props.minRentalPeriod);

  return (
    <div className="car-main">
      <div className="car-main__left">
        <CarGallery
          img={props.img}
          photos={props.photos}
          alt={getImageAltText({ carBrand, carModel, year }, props.cityName)}
        />
        <ParkList {...props} />
        <BonusesList {...props} />
      </div>
      <div className="car-main__right">
        <div className="car-main__title-container">
          <CarTitleWithYear
            title={carTitle}
            year={year}
          />
          <Counters
            callsCount={props.callsCount}
            viewedCount={props.viewedCount}
          />
        </div>
        <div className="car-main__schedule">
          <ScheduleCards
            carId={props.id}
            scheduleRental={props.scheduleRental}
            schedulePiecework={props.schedulePiecework}
            minRentalPeriod={props.minRentalPeriod}
            dailyRent={props.dailyRent}
            depositCost={props.depositCost}
            currency={props.currency}
            commission={props.commission}
            showArrows
          />
        </div>
        <div className="car-main__subinfo">
          <div className="car-main__subinfo-item">
            <Specifications
              gearBox={props.gearBox}
              fuelType={props.fuelType}
              tariffs={props.tariffs}
            />
          </div>
          <div className="car-main__subinfo-item">
            <Additionally
              branded={props.branded}
              yellowNumbers={props.yellowNumbers}
              babyChair={props.babyChair}
            />
          </div>
          <div className="car-main__subinfo-item">
            <RentTerms
              minRentalPeriod={minRentalPeriod}
              schedule={scheduleNames}
              payoutSchedule={props.payoutSchedule}
            />
          </div>
        </div>
        {
          props.selfEmployedPark && (
            <div className="car-main__self-employed">
              <span className="car-main__property">
                <img
                  src="/images/smz.svg"
                  alt="smz"
                />
                Работает с самозанятыми
              </span>
            </div>
          )
        }
        <div className="car-main__address">
          <div className="car-main__address__title">Адрес:</div>
          <div>{props.addressWithOutCountry}</div>
        </div>
        <WorkTime
          workTime={props.workTime}
          workTimeData={props.workTimeData}
          weekdays={props.weekdays}
        />
        <ParkComment additionalInfo={props.additionalInfo} />
      </div>
    </div>
  );
};

CarMain.propTypes = {
  ...CarType
};

CarMain.defaultProps = {
  schedule: []
};

export default CarMain;
