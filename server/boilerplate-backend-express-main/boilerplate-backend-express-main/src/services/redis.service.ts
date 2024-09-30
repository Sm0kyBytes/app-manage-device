import { createClient, RedisClientType } from 'redis';

export default class RedisClient {
    private client: RedisClientType;

    constructor() {
        // Initialize Redis client
        this.client = createClient();

        // Handle Redis client errors
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }

    // Connect to Redis
    public async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log('Connected to Redis');
        } catch (err) {
            console.error('Failed to connect to Redis:', err);
        }
    }

    // Disconnect from Redis
    public async disconnect(): Promise<void> {
        try {
            await this.client.disconnect();
            console.log('Disconnected from Redis');
        } catch (err) {
            console.error('Failed to disconnect from Redis:', err);
        }
    }

    // Set a value in Redis
    public async setValue(key: string, value: string): Promise<void> {
        try {
            await this.client.set(key, value);
            console.log(`Set ${key}: ${value}`);
        } catch (err) {
            console.error(`Failed to set ${key}:`, err);
        }
    }

    // Get a value from Redis
    public async getValue(key: string): Promise<string | null> {
        try {
            const value = await this.client.get(key);
            console.log(`Get ${key}: ${value}`);
            return value;
        } catch (err) {
            console.error(`Failed to get ${key}:`, err);
            return null;
        }
    }
}
