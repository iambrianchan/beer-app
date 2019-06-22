FROM node:8

WORKDIR /usr/src/app

COPY package.json .

copy . .

RUN yarn install

EXPOSE 8080
RUN ./node_modules/gulp/bin/gulp.js
CMD ["node", "index.js"]
