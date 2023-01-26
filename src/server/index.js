/* eslint-disable implicit-arrow-linebreak */

import path from 'path';
import React from 'react';
import express from 'express';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { Helmet } from 'react-helmet';
import dotenv from 'dotenv';
import device from 'express-device';

import cookieParser from 'cookie-parser';
import es6Promise from 'es6-promise';
import winston from 'winston';
import expressWinston from 'express-winston';
import expressRequestId from 'express-request-id';
import 'isomorphic-fetch';

import App from 'modules/core/components/App';
import { getActiveRoute } from 'routes';
import { createStore, prefetchCoreSaga } from 'modules/core';
import { clientConfig } from '../../webpack/webpack.common';
import getYaMetrica from './getYaMetrica';

es6Promise.polyfill();
dotenv.config();

const devMode = process.env.NODE_ENV !== 'production';

const app = express();

// Add id to express' request
app.use(expressRequestId());

// Check on Bad URL
app.use(async (req, res, next) => {
  try {
    decodeURIComponent(req.path);
  } catch (error) {
    return res.status(400).send('Ops! Bad URL');
  }
  return next();
});

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'info.log',
      maxsize: 104857600, // 100mb
      maxFiles: 10
    })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true
}));

app.use(device.capture());
app.use(cookieParser());

if (devMode) {
  // eslint-disable-next-line global-require
  const { devMiddleware, hotMiddleware } = require('./devMiddleware');
  // eslint-disable-next-line global-require
  const { createProxyMiddleware } = require('http-proxy-middleware');

  app.use(devMiddleware);
  app.use(hotMiddleware);

  app.use(
    ['/api', '/source'],
    createProxyMiddleware({ target: process.env.APP_HOST, changeOrigin: true })
  );
}

const staticPath = clientConfig.output.path;
app.use(clientConfig.output.publicPath, express.static(staticPath));

const env = serialize({
  REACT_APP_YA_METRICS_ID: process.env.REACT_APP_YA_METRICS_ID,
  REACT_APP_YA_LINK_TAXIPARK_LOGIN:
  process.env.REACT_APP_YA_LINK_TAXIPARK_LOGIN
});

const isProduction = process.env.NODE_ENV === 'production';

const renderPage = ({
  extractor,
  html,
  helmet,
  preloadedState,
  params
}) => `
  <!doctype html>
  <html>
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      >
      ${helmet.title.toString()}
      ${helmet.base.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${extractor.getStyleTags()}
    </head>
    <body>
      <div id='root'>${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${serialize(preloadedState)};
        window.ENV = ${env};
      </script>
      ${extractor.getScriptTags()}
      ${isProduction ? getYaMetrica(params) : ''}
    </body>
  </html>`;

const statsFile = path.join(clientConfig.output.path, 'stats.json');
const extractor = new ChunkExtractor({ statsFile });

app.use('/ping', (req, res) => res.sendStatus(200));

app.use('/*', async (req, res) => {
  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });
  const store = createStore(history);

  try {
    const activeRoute = getActiveRoute(req.originalUrl);
    if (!activeRoute) {
      res.status(404).send('Not found');
      return;
    }

    await store.runSaga(prefetchCoreSaga, { req, res }).toPromise();

    if (activeRoute.serverSideSaga) {
      await store.runSaga(activeRoute.serverSideSaga, { req, res }).toPromise();
    }

    if ([302, 301].includes(res.statusCode)) {
      res.end();
      store.closeSagas();
      return;
    }

    const context = {};
    const preloadedState = store.getState();
    const jsx = extractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={req.originalUrl} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const html = renderToString(jsx);
    // get HTML headers
    const helmet = Helmet.renderStatic();

    const params = {
      driver_id: preloadedState.user.userId
    };

    if (context.url) {
      res.writeHead(301, { Location: context.url });
      res.end();
      store.closeSagas();
    } else {
      res.send(renderPage({
        extractor,
        html,
        helmet,
        preloadedState,
        params
      }));
      store.closeSagas();
    }
  } catch (error) {
    res.status(500).send(error.message);
    store.closeSagas();
  }
});

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error'
    })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  process.stdout.write(`app listening on ${port}\n`);
});
