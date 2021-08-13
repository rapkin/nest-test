import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

class ConfigService {
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'postgres',
      entities: ['**/*.entity{.ts,.js}'],
    };
  }

  public getJWTConfig(): JwtModuleOptions {
    return {
      secret: 'secret42',
    };
  }
}

const configService = new ConfigService();

export { configService };
