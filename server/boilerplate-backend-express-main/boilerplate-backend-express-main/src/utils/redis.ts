import RedisClient from "../../src/services/redis.service";

export async function getRedis(key: string): Promise<string> {
    const redisClient = new RedisClient();
    await redisClient.connect();
    const value = await redisClient.getValue(key);
    console.log("Retrieved value:", value);
    await redisClient.disconnect();
    return value as string;
}

export async function setRedis(key: string, value: any) {
    const redisClient = new RedisClient();
    await redisClient.connect();
    await redisClient.setValue(key, value);
    console.log("set value:", value);
    await redisClient.disconnect();
}
