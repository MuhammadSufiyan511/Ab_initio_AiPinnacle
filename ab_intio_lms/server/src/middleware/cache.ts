import { createClient } from 'redis';
import { Request, Response, NextFunction } from 'express';

// Initialize Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis (do this once)
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis cache');
  } catch (err) {
    console.error('Failed to connect to Redis', err);
  }
})();

export const cacheMiddleware = (durationInSeconds: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl || req.url}`;

    try {
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      } else {
        // Intercept response.json to save to cache before sending
        const originalJson = res.json.bind(res);
        res.json = (body: any) => {
          redisClient.setEx(key, durationInSeconds, JSON.stringify(body))
            .catch(err => console.error('Redis SetEx Error', err));
          return originalJson(body);
        };
        next();
      }
    } catch (err) {
      console.error('Redis Get Error', err);
      // Fallback to normal execution if cache fails
      next();
    }
  };
};

export { redisClient };
