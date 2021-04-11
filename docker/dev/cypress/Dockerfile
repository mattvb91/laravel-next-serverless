FROM cypress/browsers:node14.16.0-chrome89-ff86

RUN yarn global add cypress && \
    cypress install && cypress verify && cypress info && \
    yarn cache clean --mirror && \
    apt-get install -y tar wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* 