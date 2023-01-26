import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { historyType, locationType } from 'types';

import CustomButtons from './CustomButtons';

import { getPoint, getClusterIcons } from '../../utils/map';

const style = {
  position: 'absolute',
  width: '100%',
  top: 0,
  bottom: 0,
  overflow: 'hidden'
};

class Map extends PureComponent {
  componentDidMount() {
    window.ymaps.ready(this.initMap);
  }

  componentDidUpdate(prevProps) {
    if (!this.map) {
      return;
    }

    const {
      center,
      zoom,
      points,
      selectedOffersIds,
      city
    } = this.props;

    if (prevProps.city !== city) {
      this.map.setCenter(center, zoom);
    }

    if (
      points !== prevProps.points
      || selectedOffersIds !== prevProps.selectedOffersIds
    ) {
      this.addObjectsToClusterer();
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.destroy();
    }
  }

  initMap = () => {
    const {
      center, zoom, setMapZoom, setMapCenter
    } = this.props;

    this.map = new window.ymaps.Map(
      'map',
      {
        center,
        zoom,
        controls: []
      },
      {
        vector: true,
        yandexMapDisablePoiInteractivity: true,
        suppressMapOpenBlock: true
      }
    );

    this.map.events.add('boundschange', (e) => {
      const newZoom = e.get('newZoom');
      const newCenter = e.get('newCenter');

      setMapCenter(newCenter);

      if (newZoom !== e.get('oldZoom')) {
        setMapZoom(newZoom);
      }
    });

    const clustererSelectedLayout = window.ymaps.templateLayoutFactory
      .createClass(
        `<div style="color: #FFFFFF; font-weight: bold;">
          {{ properties.geoObjects.length }}
        </div>`
      );

    this.clusterer = new window.ymaps.Clusterer({
      minClusterSize: 1,
      clusterIcons: getClusterIcons('cluster'),
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: false
    });

    this.clustererSelected = new window.ymaps.Clusterer({
      minClusterSize: 1,
      clusterIcons: getClusterIcons('cluster-selected'),
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: false,
      clusterIconContentLayout: clustererSelectedLayout
    });

    this.clusterer.events.add('click', this.onClustererClick);
    this.clustererSelected.events.add('click', this.onClustererClick);

    this.map.geoObjects.add(this.clusterer);
    this.map.geoObjects.add(this.clustererSelected);
    this.addObjectsToClusterer();
  };

  addObjectsToClusterer = () => {
    const { points, selectedOffersIds } = this.props;

    this.clusterer.removeAll();
    this.clustererSelected.removeAll();

    const geoObjects = points
      .filter((point) => !selectedOffersIds.includes(point.id))
      .map((point) => getPoint(point));

    const geoObjectsSelected = points
      .filter((point) => selectedOffersIds.includes(point.id))
      .map((point) => getPoint(point));

    this.clusterer.add(geoObjects);
    this.clustererSelected.add(geoObjectsSelected);
  };

  onClustererClick = (event) => {
    const { onPointClick, history, location } = this.props;
    let offersIds = [];

    this.target = event.get('target');

    /**
     * check if target has getGeoObjects method, then it is clusterer, else it
     * is single point
     * */
    if (this.target.getGeoObjects) {
      // Проверяем нужно ли зумиться
      const bbox = event.get('target').getBounds();

      const isZoom = !isEqual(bbox[0], bbox[1]);

      if (isZoom) {
        this.map.setBounds(bbox, { duration: 500 });

        return;
      }

      // Если зумиться некуда, открываем панельку
      this.selectedPoints = this.target.getGeoObjects();

      offersIds = this.selectedPoints.map((point) => point.properties.get('id'));
    } else {
      offersIds = [this.target.properties.get('id')];
    }

    onPointClick(offersIds);
    history.push({
      hash: 'offers',
      search: location.search
    });
  };

  onChangeZoom = (e) => {
    if (!this.map) {
      return;
    }

    const { id } = e.target;

    const zoom = this.map.getZoom();

    if (id === 'plus') {
      this.map.setZoom(zoom + 1, { duration: 300 });
    } else {
      this.map.setZoom(zoom - 1, { duration: 300 });
    }
  };

  getPosition = () => {
    window.ymaps.geolocation.get().then((res) => {
      const { geoObjects } = res;

      if (this.geoPin) {
        this.map.geoObjects.remove(this.geoPin);
      }

      this.map.geoObjects.add(geoObjects);
      this.map.setCenter(geoObjects.position, 12);
      this.geoPin = geoObjects;
    });
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { selectedOffersIds, history } = this.props;
    const isOffers = history.location.hash === '#offers';

    return (
      <div
        id="map"
        style={style}
      >
        <CustomButtons
          onChangeZoom={this.onChangeZoom}
          getPosition={this.getPosition}
          isPanelOpen={isOffers && selectedOffersIds.length}
        />
      </div>
    );
  }
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOffersIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  history: PropTypes.shape(historyType).isRequired,
  setMapCenter: PropTypes.func.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  onPointClick: PropTypes.func.isRequired,
  location: PropTypes.shape(locationType).isRequired
};

export default Map;
