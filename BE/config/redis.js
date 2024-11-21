import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
};

export { redisClient, connectRedis };
