import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Robot } from '../robot/robot.entity';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './data/toy-robot.db',
  entities: [Robot],
  synchronize: true,
};

export default databaseConfig;
