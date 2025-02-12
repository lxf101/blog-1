const redis = require('redis');
const {REDIS_CONFIG} = require('../conf/db');

// create client side
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

!(async function(){
    // connect
    await redisClient.connect().then(()=>console.log('redis connect successfully'))
    .catch(console.error);
})();

async function setRedis(key, val){
    if(typeof val === 'object'){
        val = JSON.stringify(val);
    }
    await redisClient.set(key, val, redis.print);
}

async function getRedis(key){
    try{
        let value = await redisClient(key);
        if(value == null) return value;
        try{
            value = JSON.parse(value);
        }catch(err){}
        return value;
    }catch(err){
        throw err;
    }
}

module.exports = {
    setRedis,
    getRedis
}
