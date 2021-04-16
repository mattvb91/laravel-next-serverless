FROM cypress/browsers:node14.16.0-chrome89-ff86

RUN npm i -g cypress && \
    cypress install && cypress verify && cypress info && \
    npm cache clean --force && \
    apt-get install -y tar && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

