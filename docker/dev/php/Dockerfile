FROM php:8.3-alpine


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

WORKDIR /app

EXPOSE 8000

ENTRYPOINT [ "php", "artisan", "serve", "--host=0.0.0.0", "--port=8000" ]