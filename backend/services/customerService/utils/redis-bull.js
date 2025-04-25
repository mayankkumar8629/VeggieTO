import Redis from 'ioredis';

// Helper to create a Bull-compatible Redis client
export const createBullRedisClient = (type) => {
  const client = new Redis({
    host: '127.0.0.1',
    port: 6379,
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  });

  // Only ping on initial 'client' connection
  if (type === 'client') {
    client.ping()
      .then(() => console.log('✅ Bull Redis ping successful'))
      .catch((err) => console.error('❌ Bull Redis ping failed:', err));
  }

  return client;
};



