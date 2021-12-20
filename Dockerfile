FROM node:14.17-alpine as develop-step 
WORKDIR /app 
COPY package*.json ./ 
RUN yarn global add @quasar/cli 
COPY . .

# build step 
FROM develop-step as build-step 
RUN yarn 
RUN quasar build 

# production step
FROM nginx:1.21.0-alpine as production-step 
COPY --from=build-step /app/dist/spa /usr/share/nginx/html 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]