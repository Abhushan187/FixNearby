import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis error:', err.message);
});

// Cache-aside helper: get or set with TTL
export const getOrSetCache = async (key, ttlSeconds, fetchFn) => {
  try {
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    console.error('Redis GET error:', err.message);
  }

  const data = await fetchFn();

  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(data));
  } catch (err) {
    console.error('Redis SET error:', err.message);
  }

  return data;
};

// Delete keys matching a pattern (for invalidation)
export const deleteCachePattern = async (pattern) => {
  try {
    const stream = redis.scanStream({ match: pattern });
    const pipeline = redis.pipeline();
    let keyCount = 0;

    stream.on('data', (keys) => {
      if (keys.length) {
        keys.forEach((key) => {
          pipeline.del(key);
        });
        keyCount += keys.length;
      }
    });

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    if (keyCount) {
      await pipeline.exec();
    }
    return keyCount;
  } catch (err) {
    console.error('Redis DEL pattern error:', err.message);
    return 0;
  }
};

// Graceful disconnect
export const disconnectRedis = async () => {
  await redis.quit();
};

export default redis;