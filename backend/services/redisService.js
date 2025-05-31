import redisClient from "../config/redis.js";

const TTL_SECONDS_ONE_HOUR = 60 * 60;

export const cacheUserHooby = async (uid, hobbyData) => {
    const key = `hobbies:${uid}`;
    try {
        const existing = await redisClient.get(key);
        const hobbies = existing ? JSON.parse(existing) : [];

        if (hobbies.length >= 3) {
            hobbies.shift(); // remove oldest
        }

        hobbies.push(hobbyData);

        await redisClient.set(key, JSON.stringify(hobbies), {
            EX: TTL_SECONDS_ONE_HOUR,
        })
    } catch (e) {
        console.error(`rror caching hobby to redis: `, e);
    }
}

export const getCachedUserHobbies = async (uid) => {
    const key = `hobbies:${uid}`;
    try {
        const existing = await redisClient.get(key);
        return existing ? JSON.parse(existing) : [];
    } catch (e) {
        console.error(`Error retrieving hobbies from cache for user ${user}: `, e);
        return [];
    }
}