# stage 1 as builder
FROM node:latest as builder

WORKDIR /app

# copy the package.json to install dependencies
COPY package.json yarn.lock .yarn .yarnrc.yml ./


# Install the dependencies and make the folder
RUN yarn install

COPY . .

# Build the project and copy the files
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
