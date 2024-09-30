FROM node:alpine

RUN npm install -g pnpm

WORKDIR /backend
COPY . /backend

RUN pnpm install && pnpm run build

EXPOSE 3000

CMD [ "/bin/sh", "/backend/start.sh"]