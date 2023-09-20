FROM node:18.16.0

WORKDIR /home/app
COPY ./package*.json ./

RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build
