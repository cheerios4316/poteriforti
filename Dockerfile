FROM php:8.4-apache

# Enable Apache rewrite module
RUN a2enmod rewrite

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl bash unzip git \
    default-mysql-client \
    libpng-dev libzip-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Install Node.js and npm using official Node source
RUN curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /var/www/html

COPY . .

# Install PHP and JS dependencies
RUN composer clear-cache && \
    composer update && \
    composer install && \
    npm install && \
    npm install tailwindcss


# Expose port 80
EXPOSE 80
