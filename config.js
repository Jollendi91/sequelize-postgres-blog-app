'use strict';

const env = process.env.NODE_ENV || 'development';

const DATABASE_URL = (
    process.env.DATABASE_URL || 'postgres://localhost/dev-blog-app'
);

const TEST_DATABASE_URL = (
    process.env.TEST_DATABASE_URL || 'postgres://localhost/test-blog-app'
);

module.exports = {
    PORT: process.env.PORT || 8080,
    DATABASE_URL: env === 'test' ? TEST_DATABASE_URL : DATABASE_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    SEQUELIZE_OPTIONS: {
        logging: env === 'test' ? false : console.log,
        dialect: 'postgres'
    }
}