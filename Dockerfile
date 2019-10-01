FROM node:12-slim

ENV DIR /app

# make the 'app' folder the current working directory
WORKDIR ${DIR}

# copy project to container
COPY . ${DIR}

# install project dependencies
RUN npm install

ENV HOST 0.0.0.0
