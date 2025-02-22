const env = process.env.NODE_ENV;

let MYSQL_CONFIG;
let REDIS_CONFIG;

// localhost config
if(env === 'dev'){
    MYSQL_CONFIG = {
        host: "localhost",
        user: 'root',
        password: "123456",
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

// online config
if(env === 'production'){
    MYSQL_CONFIG = {
        host: "localhost",
        user: 'root',
        password: "123456",
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}