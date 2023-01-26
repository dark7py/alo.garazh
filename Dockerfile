FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i

# Build web app
COPY public ./public

COPY src ./src
COPY webpack ./webpack
COPY postcss.config.js ./postcss.config.js
COPY .babelrc ./.babelrc

RUN npm run build:prod

EXPOSE 3000
ENV APP_HOST http://ytmp-stage2.inno.co
CMD [ "node", "dist/server.js" ]
