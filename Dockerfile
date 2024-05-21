# Installing dependencies:
FROM node:20.13.1-alpine as install
WORKDIR /app
COPY package.json yarn.lock ./
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN yarn install --production=true
COPY . .

# Creating a build:
FROM node:20.13.1-alpine as build
WORKDIR /app
COPY --from=install /app ./
RUN yarn build
USER node

# Running the application:
FROM node:20.13.1-alpine as run
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
CMD yarn start:prod