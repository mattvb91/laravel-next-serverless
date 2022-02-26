FROM cypress/browsers:node14.17.0-chrome91-ff89

ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

RUN npm i -g cypress@9.4.1 && \
    cypress install && cypress verify && cypress info && \
    npm cache clean --force && \
    apt-get install -y tar && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# give every user read access to the "/root" folder where the binary is cached
# we really only need to worry about the top folder, fortunately
RUN ls -la /root
RUN chmod 755 /root
RUN chmod -R 755 /root/.cache/Cypress
RUN chmod -R 755 /root/.config/Cypress