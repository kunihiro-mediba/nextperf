import { Redis, type RedisOptions } from "ioredis";
import nextSession, { type SessionStore } from "next-session";
import type { SessionData, SessionRecord } from "next-session/lib/types";

class RedisSessionStore implements SessionStore {
    private readonly clients: Redis[] = [];

    private getClient() {
        const i = Math.floor(Math.random() * this.clients.length);
        return this.clients[i];
    }

    constructor() {
        const poolSize = parseInt(process.env.REDIS_POOLSIZE ?? "1", 10);
        const endpoint = process.env.REDIS_URL || "redis://localhost:6379";
        const options = {
            connectTimeout: 1000,
            maxRetriesPerRequest: 1,
            reconnectOnError(_err: Error) {
                return false;
            },
            retryStrategy(times: number) {
                return Math.min(times * 10000, 60000);
            },
            keepAlive: 120000,
            lazyConnect: true,
        } satisfies RedisOptions;
        for (let i = 0; i < poolSize; i++) {
            const c = new Redis(endpoint, options);
            this.clients.push(c);
        }
    }

    private getCacheKey(sid: string): string {
        return `sess:${sid}`;
    }

    async get(sid: string): Promise<SessionData<SessionRecord> | null | undefined> {
        const key = this.getCacheKey(sid);
        const buf = await this.getClient().get(key);
        if (buf) {
            return JSON.parse(buf);
        }
        return null;
    }

    async set(sid: string, sess: SessionData<SessionRecord>): Promise<void> {
        const key = this.getCacheKey(sid);
        const buf = JSON.stringify(sess);
        this.getClient().setex(key, 60, buf);
    }

    async destroy(sid: string): Promise<void> {
        const key = this.getCacheKey(sid);
        this.getClient().del([key]);
    }

    async touch?(sid: string, sess: SessionData<SessionRecord>): Promise<void> {
        const key = this.getCacheKey(sid);
        this.getClient().touch([key]);
    }
}

interface AppSession extends SessionRecord {
    count?: number;
}

export const getSession = nextSession<AppSession>({
    store: new RedisSessionStore(),
    name: "sid",
    cookie: {
        path: "/",
        maxAge: 3600,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    },
});

console.log("getSession initialized");
