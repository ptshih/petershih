import winston from 'winston';

// TODO: add transports and dynamic log levels

winston.loggers.add('api', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'api',
  },
});

winston.loggers.add('app', {
  console: {
    level: 'silly',
    colorize: true,
    label: 'app',
  },
});
