import { Module } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { MYSQL } from '../config';

const databaseProviders = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () =>
    await createConnection({
      ...MYSQL,
      type: 'mysql',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
};

@Module({
  providers: [databaseProviders],
  exports: [databaseProviders],
})
export class DatabaseModule {}

export const generateDBRepo = (name: string, entity: any) => {
  return {
    provide: name,
    useFactory: (connection: Connection) => connection.getRepository(entity),
    inject: ['DATABASE_CONNECTION'],
  };
};
