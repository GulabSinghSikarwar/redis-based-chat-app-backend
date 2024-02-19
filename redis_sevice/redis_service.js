const redisIO = require('ioredis')

const publisher = new redisIO.Redis({
    host: 'redis-10555.c299.asia-northeast1-1.gce.cloud.redislabs.com',
    port: 10555,
    username: 'default',
    password: 'A8bC8hNQNl8LFxFWKvEtSPVSSw7NoPDd'
});

const subscriber = new redisIO.Redis({
    host: 'redis-10555.c299.asia-northeast1-1.gce.cloud.redislabs.com',
    port: 10555,
    username: 'default',
    password: 'A8bC8hNQNl8LFxFWKvEtSPVSSw7NoPDd'
});



module.exports = { publisher, subscriber }
