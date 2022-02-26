FROM php:8.1-alpine


RUN apk --no-cache add libmcrypt-dev \
                       libltdl \
                       libxml2-dev \
                       icu-dev \
                       freetype-dev \
                       libjpeg-turbo-dev \
                       libpng-dev \
                       m4 \
                       perl \
                       autoconf \
                       libc6-compat \
                       build-base \
                       libzip-dev \
                       oniguruma-dev

RUN docker-php-ext-install gd \
                           zip \
                           bcmath \
                           pdo_mysql \
                           opcache \
                           pcntl \
                           sockets \
                           intl

RUN pecl install xdebug \
 && docker-php-ext-enable xdebug

ADD usr /usr/local/etc/php/conf.d/

#### COMPOSER
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /tmp
ENV COMPOSER_VERSION 2.2.6

ARG HOST_USER_UID=1000
ARG HOST_USER_GID=1000

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh \
 && apk --no-cache add curl \
                       git \
                       subversion \
                       openssh \
                       openssl \
                       mercurial \
                       tini \
                       bash \
                       zlib-dev \
 && echo "memory_limit=-1" > "$PHP_INI_DIR/conf.d/memory-limit.ini" \
 && echo "date.timezone=${PHP_TIMEZONE:-UTC}" > "$PHP_INI_DIR/conf.d/date_timezone.ini" \
 && docker-php-ext-install zip \
 && cd /tmp/ && git clone --recursive --depth=1 https://github.com/nikic/php-ast.git \
 && cd php-ast && phpize && ./configure && make && make install \
 && docker-php-ext-enable ast \
 && rm -rf /tmp/php-ast/ \
 && apk --no-cache del autoconf g++ make \
 && curl -s -f -L -o /tmp/installer.php https://getcomposer.org/installer \
 && php -r " \
    \$signature = '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8'; \
    \$hash = hash('SHA384', file_get_contents('/tmp/installer.php')); \
    if (!hash_equals(\$signature, \$hash)) { \
        unlink('/tmp/installer.php'); \
        echo 'Integrity check failed, installer is either corrupt or worse.' . PHP_EOL; \
        exit(1); \
    }" \
 && php /tmp/installer.php --no-ansi --install-dir=/usr/bin --filename=composer --version=${COMPOSER_VERSION} \
 && composer --ansi --version --no-interaction \
 && rm -rf /tmp/* /tmp/.htaccess \
 && addgroup -g $HOST_USER_GID developers \
 && adduser -D -u $HOST_USER_UID -G developers developer
### COMPOSER

WORKDIR /app

ENTRYPOINT ["/entrypoint.sh"]

CMD ["composer"]
