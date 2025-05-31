import { createClient } from "redis";
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL_DEV,
});

redisClient.on('error', (e) => console.error(`Error creating redis client: `, e))

await redisClient.connect();

export default redisClient;