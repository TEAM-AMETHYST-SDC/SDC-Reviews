FROM node:14
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
RUN npm install i npm@latest -g

COPY ["package.json", "package-lock*.json", "./"]

RUN npm install

WORKDIR /sdc-reviews

COPY . .

CMD ["node", "server.js"]

