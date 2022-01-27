FROM node:16 AS builder
WORKDIR /app
COPY package*.json .
RUN yarn install
COPY . .
RUN yarn build


FROM node:16
WORKDIR /app
COPY package.json .
RUN yarn install --only=production
COPY --from=builder /app/dist ./dist
CMD ["yarn", "start:prod"]