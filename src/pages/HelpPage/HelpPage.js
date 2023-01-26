import React, { Component } from 'react';
import classname from 'classnames';

import PageContainer from 'components/PageContainer';

import InnerWrapper from 'components/InnerPageWrapper';
import ButtonLink from 'components/ui-kit/ButtonLink';
import Accordion from 'components/Accordion';

import './HelpPage.scss';

import config from './config';

class HelpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'drivers'
    };
  }

  buttonClass = (id) => {
    const { activeTab } = this.state;
    return classname(
      'help__tab',
      { 'help__tab--active': id === activeTab }
    );
  };

  changeActiveTab = (id) => () => {
    this.setState({ activeTab: id });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <PageContainer>
        <InnerWrapper page="help">
          <div className="help">
            <h1>Помощь</h1>
            <div className="help__wrapper">
              <div className="help__tabs">
                <button
                  type="button"
                  className={this.buttonClass('drivers')}
                  onClick={this.changeActiveTab('drivers')}
                >
                  Водителям
                </button>
                <button
                  type="button"
                  className={this.buttonClass('taxipark')}
                  onClick={this.changeActiveTab('taxipark')}
                >
                  Таксопаркам
                </button>
              </div>
              <div className="help__content">
                <Accordion allowMultipleOpen>
                  {
                    config[activeTab].map(({ key, label, text }) => (
                      <div key={key} label={label}>
                        {text}
                      </div>
                    ))
                  }
                </Accordion>
              </div>
            </div>
            <p className="tech">
              Если у вас есть вопросы или комментарии, напишите нам
            </p>
            <div className="help__link">
              <ButtonLink href="/feedback" theme="color">
                Написать в поддержку
              </ButtonLink>
            </div>
          </div>
        </InnerWrapper>
      </PageContainer>
    );
  }
}

export default HelpPage;
