# stage 1 as builder
FROM node:latest

# copy the package.json to install dependencies
COPY package.json yarn.lock ./

# Install the dependencies and make the folder
RUN yarn install && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

# Build the project and copy the files
RUN yarn build

EXPOSE 80

ENTRYPOINT ["yarn", "start"]
