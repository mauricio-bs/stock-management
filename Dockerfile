FROM node:20-alpine

WORKDIR /usr/app

COPY --chown=node . /usr/app

RUN yarn

# DATABASE
RUN yarn prisma generate

RUN yarn build

ENV TZ=America/Sao_Paulo

USER node

EXPOSE 3000

CMD ["yarn", "start:prod"]
