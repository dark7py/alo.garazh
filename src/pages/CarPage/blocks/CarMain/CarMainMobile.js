/* eslint-disable camelcase, react/jsx-props-no-spreading */
import React from 'react';
import { CarType } from 'types';

import ScheduleCards from 'components/ScheduleCards';

import { getImageAltText } from 'utils';
import WorkTime from 'components/WorkTime';

import CarGallery from './components/CarGallery';
import ParkList from './components/Lists/ParkList';
import BonusesList from './components/Lists/BonusesList';
import CarTitleWithYear from './components/CarTitleWithYear';
import ParkComment from './components/ParkComment';
import Specifications from './components/Specifications';
import Additionally from './components/Additionally';
import RentTerms from './components/RentTerms';
import Counters from './components/Counters';

import './CarMain.scss';

const CarMain = (props) => {
  const {
    id, img, photos, year, carBrand, carModel, dailyRent, depositCost, currency, gearBox,
    fuelType, branded, yellowNumbers, commission, schedule,
    completedCallDate, additionalInfo, directories, callsCount, viewedCount,
    babyChair, addressWithOutCountry, workTime, workTimeData, weekdays, tariffs,
    payoutSchedule, cityName, scheduleRental, schedulePiecework, selfEmployedPark
  } = props;

  const carTitle = `${carBrand.name} ${carModel.name}`;

  const scheduleNames = schedule && schedule.map((el) => {
    if (!directories.schedule_list || !directories.schedule_list[el]) {
      return [];
    }

    return directories.schedule_list[el].name;
  });

  const minRentalPeriod = (scheduleRental && scheduleRental.length)
    // eslint-disable-next-line react/destructuring-assignment
    && (scheduleRental[0].min_rental_period || props.minRentalPeriod);

  return (
    <main className="car-main car-main--mobile">
      <CarGallery
        img={img}
        photos={photos}
        alt={getImageAltText({ carBrand, carModel, year }, cityName)}
        isMobile
      />
      <CarTitleWithYear
        title={carTitle}
        year={year}
      />
      <Counters
        callsCount={callsCount}
        viewedCount={viewedCount}
      />
      <ScheduleCards
        carId={id}
        completedCallDate={completedCallDate}
        scheduleRental={scheduleRental}
        schedulePiecework={schedulePiecework}
        minRentalPeriod={minRentalPeriod}
        dailyRent={dailyRent}
        depositCost={depositCost}
        currency={currency}
        commission={commission}
      />
      <Specifications
        gearBox={gearBox}
        fuelType={fuelType}
        tariffs={tariffs}
      />
      <Additionally
        branded={branded}
        yellowNumbers={yellowNumbers}
        babyChair={babyChair}
      />
      <ParkList {...props} />
      <BonusesList {...props} />
      {
        selfEmployedPark && (
          <div className="car-main__self-employed-mobile">
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
      <RentTerms
        minRentalPeriod={minRentalPeriod}
        schedule={scheduleNames}
        payoutSchedule={payoutSchedule}
      />
      <div className="car-main__address">
        <div className="car-main__address__title">Адрес:</div>
        <div>{addressWithOutCountry}</div>
      </div>
      <WorkTime
        workTime={workTime}
        workTimeData={workTimeData}
        weekdays={weekdays}
      />
      <ParkComment additionalInfo={additionalInfo} />
    </main>
  );
};

CarMain.propTypes = CarType;

export default CarMain;
