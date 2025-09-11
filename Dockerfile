FROM node:22

WORKDIR /src

COPY . .

RUN npm install

EXPOSE 3080

CMD [ "sh", "-c", "npx prisma migrate deploy && npm run dev" ]



