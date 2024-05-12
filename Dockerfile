FROM node:16.20-alpine as global-deps-stage
RUN yarn global add @quasar/cli

FROM global-deps-stage as develop-stage
WORKDIR /src
COPY package.json ./
COPY . .

FROM develop-stage as local-deps-stage
RUN yarn

FROM local-deps-stage as build-spa-stage
RUN quasar build

FROM local-deps-stage as build-pwa-stage
RUN quasar build -m pwa

FROM local-deps-stage as build-cordova-android-stage
RUN quasar build -m cordova -T android

FROM local-deps-stage as build-capacitor-android-stage
RUN quasar build -m capacitor -T android -d

FROM local-deps-stage as build-electron-stage
RUN quasar build -m electron

FROM nginx:alpine3.18 as prod-spa-stage
COPY --from=build-spa-stage /src/dist/spa /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker-config/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine3.18 as prod-pwa-stage
COPY --from=build-pwa-stage /src/dist/pwa /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker-config/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]