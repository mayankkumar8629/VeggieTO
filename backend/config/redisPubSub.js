import Redis from "ioredis";

export const publisher = new Redis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,

});

export const subscriber = new Redis({
    host:'127.0.0.1',
    port:6379,
    maxRetriesPerRequest: null,
})

publisher.on('connect', () => console.log('✅ Pub/Sub publisher ready'));
subscriber.on('connect', () => console.log('✅ Pub/Sub subscriber ready'));