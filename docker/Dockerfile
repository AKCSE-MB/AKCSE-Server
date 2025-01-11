FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json .


RUN apk update && apk add bash 
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc yarn install

COPY . .

EXPOSE 3000

# ENTRYPOINT ["node"]
CMD ["npm", "run", "dev"]
