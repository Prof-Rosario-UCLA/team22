import { createClient } from "redis";
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    //url: process.env.REDIS_URL
    url: process.env.REDIS_URL_PROD // PROD
});

redisClient.on('error', (e) => console.error(`Error creating redis client: `, e))

await redisClient.connect();

export default redisClient;