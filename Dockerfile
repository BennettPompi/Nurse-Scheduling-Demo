FROM node:alpine AS build

RUN npm install -g pnpm

WORKDIR /frontend
COPY ./frontend /frontend
RUN pnpm install && pnpm run build

WORKDIR /backend
COPY ./backend /backend
RUN pnpm install && pnpm run build

FROM node:alpine AS run

COPY --from=build /frontend/dist /frontend

COPY --from=build /backend/dist /backend/dist
COPY --from=build /backend/node_modules /backend/node_modules

ENV FRONTEND_PATH=/frontend

CMD [ "node", "/backend/dist/main"]