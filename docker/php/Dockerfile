FROM php:8.0-fpm

RUN apt update \
    && apt install -y zlib1g-dev g++ git libicu-dev zip libzip-dev zip \
    && docker-php-ext-install intl opcache pdo pdo_mysql \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

WORKDIR /var/www/backend

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' |  bash
RUN apt install symfony-cli
RUN export PATH="$HOME/.symfony/bin:$PATH".
RUN export PATH="${PATH}:/root/.composer/vendor/bin"
#RUN source ~/.bashrc
#RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony
ENV COMPOSER_ALLOW_SUPERUSER=1




RUN docker-php-ext-install pdo
RUN apt-get update -y && apt-get install -y libwebp-dev libjpeg62-turbo-dev libpng-dev libxpm-dev \
    libfreetype6-dev
RUN apt-get update && \
    apt-get install -y \
        zlib1g-dev \
		libonig-dev

RUN docker-php-ext-install mbstring

RUN apt-get install -y libzip-dev
RUN docker-php-ext-install zip

RUN docker-php-ext-configure gd

RUN apt install -y libxslt-dev
RUN docker-php-ext-install xsl

RUN docker-php-ext-install gd

RUN apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

RUN mkdir -p config/jwt; \
echo "test" > config/password.txt; \
openssl genrsa -passout file:config/password.txt -out config/jwt/private.pem -aes256 4096; \
openssl rsa -passin file:config/password.txt -pubout -in config/jwt/private.pem -out config/jwt/public.pem;
RUN chmod 755 -R config/jwt/public.pem

RUN git config --global user.email "kechiche.marwene@wimova.com" \ 
    && git config --global user.name "Marwene KECHICHE"


CMD composer install ; php-fpm ; symfony server:start -d