import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

/*Etablire la connection a redis
  ansi les operations cache get et set */
@Injectable()
export class RedisService implements OnModuleInit{
    private redisClient: Redis;
    // Creation du client redis a l'initialisation du module
    onModuleInit() {
        this.redisClient = new Redis({
            host: 'localhost',
            port: 6379,
        });
    }
    /**
   * Récupère une valeur depuis Redis.
   * @param key - clé du cache
   */
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  /**
   * Sauvegarde une valeur dans Redis.
   * @param key - clé du cache
   * @param value - données à enregistrer
   * @param ttl - durée de vie en secondes
   */
    async set<T>(key: string, value: unknown, ttl =  7200): Promise<void> {
        await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
      } 
}