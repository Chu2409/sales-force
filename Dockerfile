FROM node:20.13.1-alpine
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --production=true
RUN yarn -D add @nestjs/cli 
RUN yarn build
USER node
# CMD ["yarn", "prisma", "db", "push", "&&", "yarn", "start:prod"]
CMD ["yarn", "start:prod"]