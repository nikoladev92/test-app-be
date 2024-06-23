import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';

import { env } from 'env';
import { expressLoader } from 'loaders/express.loader';
import { iocLoader } from 'loaders/ioc.loader';
import { monitorLoader } from 'loaders/monitor.loader';
import { winstonLoader } from 'loaders/winston.loader';
import { banner } from 'utils/banner';
import { Logger } from 'utils/logger';
import { homeLoader } from 'loaders/home.loader';

const log = new Logger(__filename);
bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [
    winstonLoader,
    iocLoader,
    expressLoader,
    monitorLoader,
    homeLoader,
  ],
})
  .then(() => {
    banner(log);

    switch (env.node) {
      case 'local':
        // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-var-requires
        const { runner } = require('runner');
        runner();
        break;
    }
  })
  .catch((error) => log.error('Application is crashed: ' + error));
