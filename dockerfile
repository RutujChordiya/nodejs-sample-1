FROM node:22-alpine3.19

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]