FROM cypress/browsers:node14.17.0-chrome91-ff89

RUN npm i -g cypress && \
    cypress install && cypress verify && cypress info && \
    npm cache clean --force && \
    apt-get install -y tar && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
