import { DataSource, DatabaseType } from 'typeorm';
import { Config } from '../config/configuration';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: Config.db.host,
        port: Config.db.port,
        username: Config.db.username,
        password: Config.db.password,
        database: Config.db.database,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
