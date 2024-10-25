import { z } from 'zod';

const envSchema = z.object({
  // API
  NODE_ENV: z
    .enum(['production', 'test', 'development', 'local', 'docker'])
    .default('local'),
  PORT: z.coerce.number().default(3000),
  // DATABASE
  DATABASE_URL: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  // SECRETS
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  // RATE LIMIT
  RATELIMIT_TTL: z.coerce.number().default(1000),
  RATELIMIT_LIMIT: z.coerce.number().default(1),
  // CACHE
  CACHE_REDIS_URL: z.string(),
  CACHE_TTL: z.coerce.number().default(60),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: unknown): Env {
  return envSchema.parse(env);
}
