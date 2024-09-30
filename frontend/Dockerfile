FROM node:alpine

RUN npm install -g pnpm

WORKDIR /frontend
COPY . /frontend

RUN pnpm install

EXPOSE 5173

# could do a reverse proxy or something better to host it, but this is good enough for now
CMD pnpm run dev
