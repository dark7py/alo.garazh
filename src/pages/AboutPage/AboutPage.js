import React, { Component } from 'react';
import xor from 'lodash.xor';

import PageContainer from 'components/PageContainer';
import InnerWrapper from 'components/InnerPageWrapper';
import MultySelect from 'components/ui-kit/MultySelect';
import CheckBox from 'components/ui-kit/CheckBox';
import ButtonGroup from 'components/ui-kit/ButtonGroup';
import ButtonLink from 'components/ui-kit/ButtonLink';

import './AboutPage.scss';

import Helmet from './Helmet';

import { gearboxList, bonusesList, classesList } from './config';

class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      noDeposit: false,
      gearbox: []
    };
  }

  onChangeList = (id) => (value) => {
    this.setState((prevState) => ({
      [id]: xor(prevState[id], [value])
    }));
  };

  changeNoDeposit = () => {
    this.setState(({ noDeposit }) => ({ noDeposit: !noDeposit }));
  };

  render() {
    const { classes, noDeposit, gearbox } = this.state;

    return (
      <>
        <Helmet />
        <PageContainer>
          <InnerWrapper page="about">
            <div className="about">
              <h1>О проекте</h1>
              <p className="big">
                «Яндекс.Гараж» — сервис, где водители могут арендовать,
                а таксопарки — сдать в аренду автомобиль для перевозки
                пассажиров и багажа.
              </p>
              <h3>Основные возможности</h3>
              <p>
                В объявлении таксопарк сразу предлагает условия
                под определенный график. Водители могут сравнить
                разные предложения и выбрать самое подходящее,
                не приезжая в таксопарк.
              </p>
              <p className="no-margin-bottom">В объявлении можно указать:</p>
              <ul className="text">
                <li>стоимость аренды машины;</li>
                <li>сумму залога и возможность работать без него;</li>
                <li>наличие жёлтых номеров;</li>
                <li>
                  расходы, которые таксопарк берёт на себя — например:
                  мойку, ремонт, топливо, ТО, КАСКО, сезонную замену шин,
                  смартфон и&nbsp;круглосуточная поддержка.
                </li>
              </ul>
              <ul className="about__list">
                {bonusesList.map((item) => (
                  <li key={item.name}>
                    <img
                      src={`/images/${item.img}`}
                      alt={item.name}
                    />
                    {item.name}
                  </li>
                ))}
              </ul>
              <p className="no-margin-bottom">
                Для поиска подходящего предложения водитель может фильтровать
                объявления по различным параметрам.
              </p>
              <div className="filters-fake">
                <div className="filters-fake__item">
                  <MultySelect
                    value={classes}
                    options={classesList}
                    onChange={this.onChangeList('classes')}
                  >
                    Тариф
                  </MultySelect>
                </div>
                <div className="filters-fake__item">
                  <ButtonGroup
                    value={gearbox}
                    options={gearboxList}
                    onChange={this.onChangeList('gearbox')}
                  />
                </div>
                <div className="filters-fake__item">
                  <CheckBox
                    id="no_deposit"
                    onChange={this.changeNoDeposit}
                    isChecked={noDeposit}
                  >
                    Без залога
                  </CheckBox>
                </div>
              </div>
              <p>
                Объявления в сервисе «Яндекс.Гараж» оставляют только
                таксопарки-партнёры Яндекс.Такси. Каждое из них
                проверяют модераторы.
              </p>
              <p>
                Если водителю интересно предложение, он заказывает
                звонок из таксопарка, который опубликовал объявление.
                Таксопарк может связаться с ним также через сервис.
              </p>
              <p>
                Для водителей звонок бесплатный.
              </p>
              <p>
                Если у вас есть вопросы или комментарии,
                <a href="/feedback"> напишите нам.</a>
              </p>
              <div className="about__link">
                <ButtonLink href="/feedback" theme="color">
                  Написать в поддержку
                </ButtonLink>
              </div>
            </div>
          </InnerWrapper>
        </PageContainer>
      </>
    );
  }
}

export default AboutPage;
