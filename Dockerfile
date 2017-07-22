FROM kkarczmarczyk/node-yarn
ARG port

ENV HOME=/usr/src/app
ENV PORT=$port

# Create app directory
RUN mkdir -p $HOME
WORKDIR $HOME

COPY process.yml $HOME/process.yml
COPY build $HOME/build
COPY server $HOME/server
COPY package.json $HOME/package.json
COPY internals $HOME/internals
# Install app dependencies
RUN npm install --production

EXPOSE 3000
CMD [ "yarn", "start:prod" ]