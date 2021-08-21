FROM node:15.5.1-alpine

ENV APP_ROOT /data
ADD . ${APP_ROOT}
#RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build
CMD ["npm", "run", "start"]
