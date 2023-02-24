// require('dotenv').config();
// const Redis = require('ioredis');

// // Create Redis instance
// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT
// });

// redis.on('ready', () => console.info('Connected to Redis'));
// redis.on('error', (err) => console.error(`Redis connection error: ${err}`));

// // Get key data from Redis cache
// async function getCache(key) {
//   try {
//     const cacheData = await redis.get(key);
//     return JSON.parse(cacheData);
//   } catch (err) {
//     console.error(`Error getting key data: ${err}`);
//     return null;
//   }
// }

// // Set Redis cache Key with a given expiry
// function setCache(key, data, ttl = process.env.REDIS_TTL) {
//   try {
//     redis.set(key, JSON.stringify(data), 'EX', ttl);
//   } catch (err) {
//     console.error(`Error setting cache key: ${err}`);
//   }
// }

// module.exports = {
//   getCache,
//   setCache
// };
