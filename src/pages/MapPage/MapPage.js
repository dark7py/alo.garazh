import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';

import { matchType } from 'types';
import MainTitle from 'blocks/MainTitle';
import Filters from 'blocks/Filters';
import PageContainer from 'components/PageContainer';

import Map from './blocks/Map';
import MapOffersPanel from './blocks/MapOffersPanel';

import Helmet from './Helmet';

import './MapPage.scss';

class MapPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mapScriptLoad: false
    };
  }

  onMapScriptLoad = () => {
    this.setState({ mapScriptLoad: true });
  };

  render() {
    const {
      match,
      offersPoints,
      selectedOffersIds,
      addSelectedOffersPoints
    } = this.props;

    const { mapScriptLoad } = this.state;
    const hasPathParams = Object.values(match.params).some(Boolean);

    return (
      <>
        <Script
          url="https://api-maps.yandex.ru/2.1/?apikey=842f3cf7-4c63-4ae7-a27b-1f4acb4384c4&lang=ru_RU"
          onLoad={this.onMapScriptLoad}
          onError={this.onMapScriptLoadError}
        />
        <Helmet
          isCanonical={hasPathParams}
          disableRobotsFollow={hasPathParams}
        />
        <div className="map-page__filters">
          <PageContainer>
            <MainTitle />
            <Filters />
          </PageContainer>
        </div>
        <div className="map-page__map">
          {
            mapScriptLoad && (
              <Map
                points={offersPoints}
                selectedOffersIds={selectedOffersIds}
                onPointClick={addSelectedOffersPoints}
              />
            )
          }
          <MapOffersPanel />
        </div>
      </>
    );
  }
}

MapPage.propTypes = {
  match: PropTypes.shape(matchType).isRequired,
  offersPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOffersIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  addSelectedOffersPoints: PropTypes.func.isRequired
};

export default MapPage;
