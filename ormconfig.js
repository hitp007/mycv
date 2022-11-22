var dbConfig = {
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'develope':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'dbs.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
