FROM node:16-alpine
COPY . /app
WORKDIR /app
RUN npm install pm2 -g && \
    pm2 install pm2-logrotate && \
    pm2 set pm2-logrotate:rotateInterval '0 0 0 * *' && \
    pm2 set pm2-logrotate:retain 7 && \
    yarn global add sequelize-cli && \
    yarn install
CMD [ "pm2-runtime", "index.js"]
