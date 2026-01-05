FROM denoland/deno:debian
LABEL maintainer="Danil Zakhvatkin <hello@danilkinkin.com>"

WORKDIR /srv/app

ADD dist /srv/app/dist
#ADD node_modules /srv/app/node_modules
ADD package.json /srv/app/package.json
#ADD ../version /srv/version
#ADD ../commit /srv/commit

ENV PORT=3000
ENV BASE_URL="/v3/"

CMD ["deno", "run", "start"]
