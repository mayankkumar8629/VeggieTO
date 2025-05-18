import Redis from 'ioredis';

class RedisClient {
  constructor() {
    this.client = new Redis({
      host: '127.0.0.1', // Connect to WSL from Windows
      port: 6379,
      // No password for development
      retryStrategy: (times) => Math.min(times * 50, 2000), // Auto-reconnect
    });

    this.client.on('error', (err) => {
      console.error('[Redis] Error:', err);
    });

    this.client.on('connect', () => {
      console.log('[Redis] Connected to 127.0.0.1:6379');
    });
  }

  


  async set(key, value, ttlSeconds = null) {
    try {
      if (ttlSeconds) {
        return await this.client.setex(key, ttlSeconds, JSON.stringify(value));
      }
      return await this.client.set(key, JSON.stringify(value));
    } catch (err) {
      console.error(`[Redis] SET failed for key ${key}:`, err);
      throw err;
    }
  }

  async get(key) {
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`[Redis] GET failed for key ${key}:`, err);
      return null;
    }
  }

  async del(key) {
    try {
      return await this.client.del(key);
    } catch (err) {
      console.error(`[Redis] DEL failed for key ${key}:`, err);
      return 0;
    }
  }

  async flush() {
    try {
      return await this.client.flushdb();
    } catch (err) {
      console.error('[Redis] FLUSH failed:', err);
      return 'ERROR';
    }
  }
}

export default new RedisClient(); // Singleton instance