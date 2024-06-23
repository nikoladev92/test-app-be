import { readFileSync } from 'fs';
import * as path from 'path';

import * as dotenv from 'dotenv';

import {
  getOsEnv,
  getOsEnvOptional,
  getOsPaths,
  normalizePort,
  toBool,
} from './utils/env';

/**
 * Load .env file or for test the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
  ),
});

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: getOsEnv('APP_NAME'),
    version: (pkg as any).version,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description: (pkg as any).description,
    host: getOsEnv('APP_HOST'),
    schema: getOsEnv('APP_SCHEMA'),
    routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
    port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
    banner: toBool(getOsEnv('APP_BANNER')),
    decodeKey: getOsEnv('APP_DECODE_KEY'),
    dirs: {
      controllers: getOsPaths('CONTROLLERS'),
      middlewares: getOsPaths('MIDDLEWARES'),
    },
  },
  log: {
    level: getOsEnv('LOG_LEVEL'),
    json: toBool(getOsEnvOptional('LOG_JSON')),
    output: getOsEnv('LOG_OUTPUT'),
  },
  monitor: {
    enabled: toBool(getOsEnv('MONITOR_ENABLED')),
    route: getOsEnv('MONITOR_ROUTE'),
  },
};
