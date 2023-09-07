export async function getFromCacheStorage(keyword: string) {
  try {
    const response = await cacheStorage.get(keyword);

    if (!(response && response.ok)) {
      return [];
    }
    const res = await response.json();

    const currentTime = new Date().getTime();
    const cachedTime = res.timestamp;
    const timeDiff = currentTime - cachedTime;

    if (timeDiff <= res.expireTime) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.error('Error while getting data from cache:', error);
    return [];
  }
}

export async function setToCacheStorage<T>(keyword: string, response: T, expireTime: number) {
  const res = { expireTime, data: response, timestamp: new Date().getTime() };
  const clonedResponse = new Response(JSON.stringify(res));
  await cacheStorage.put(keyword, clonedResponse);
}

class CacheStorage {
  private KEY: string;
  private cachePromise: Promise<Cache>;

  constructor(KEY: string) {
    this.KEY = KEY;
    this.cachePromise = caches.open(this.KEY);
  }

  async put(url: string, response: Response): Promise<void> {
    const cache = await this.cachePromise;
    await cache.put(url, response);
  }

  async get(url: string): Promise<Response | undefined> {
    const cache = await this.cachePromise;
    return await cache.match(url);
  }
}

const KEY = 'disease';
export const cacheStorage = new CacheStorage(KEY);
