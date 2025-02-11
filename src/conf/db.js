const env = process.env.NODE_ENV;

let mySqlConf;

// localhost config
if(env === 'dev'){
    mySqlConf = {
        host: "localhost",
        user: 'root',
        password: "123456",
        port: '3306',
        database: 'myblog'
    }
}

// online config
if(env === 'production'){
    mySqlConf = {
        host: "localhost",
        user: 'root',
        password: "123456",
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    mySqlConf
}