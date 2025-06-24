FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash git curl

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE ${API_TOOLS_PORT}

CMD ["npm", "run", "start"]
