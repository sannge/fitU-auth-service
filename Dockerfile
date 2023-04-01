FROM node:16-alphine

WORKDIR /app 

COPY package.json ./

RUN npm install --only=prod

COPY . .

CMD ["npm", "start"]