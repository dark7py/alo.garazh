FROM cr.yandex/crpjnf40unocamomb3i5/taxi-base-kube-xenial

RUN rm -f /etc/apt/sources.list.d/yandex.list

RUN apt-get update -y \
    ; apt-get install -y nginx \
    ; chown -R www-data:www-data /var/lib/nginx \
    ; curl -o nodejs.deb https://deb.nodesource.com/node_14.x/pool/main/n/nodejs/nodejs_14.18.1-1nodesource1_amd64.deb \
    ; apt-get install -y ./nodejs.deb \
    ; rm nodejs.deb \
    ; rm -rf /var/lib/apt/lists/* \
    ; apt-get install -y build-essential

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY build/package*.json ./

RUN npm i

# Build web app
COPY build/public ./public

COPY build/src ./src
COPY build/webpack ./webpack
COPY build/postcss.config.js ./postcss.config.js
COPY build/.babelrc ./.babelrc

RUN npm run build:prod

COPY nginx-prod.conf /etc/nginx/sites-enabled/drivers-front.conf
COPY supervisord.conf /etc/supervisor/conf.d/driver-front.conf

EXPOSE 80
