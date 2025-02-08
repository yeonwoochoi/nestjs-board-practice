import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig = (configService: ConfigService): TypeOrmModuleOptions => {
    const isTest = configService.get<string>('NODE_ENV') === 'test';

    return {
        type: isTest ? 'sqlite' : 'postgres', // 테스트 환경에서는 SQLite 사용
        host: isTest ? undefined : configService.get<string>('DB_HOST'),
        port: isTest ? undefined : configService.get<number>('DB_PORT'),
        username: isTest ? undefined : configService.get<string>('DB_USERNAME'),
        password: isTest ? undefined : configService.get<string>('DB_PASSWORD'),
        database: isTest ? ':memory:' : configService.get<string>('DB_NAME'), // 테스트에서는 In-memory DB 사용
        autoLoadEntities: true,
        synchronize: isTest || configService.get<string>('NODE_ENV') !== 'production', // 테스트 환경에서는 항상 true
        logging: !isTest && configService.get<string>('NODE_ENV') !== 'production', // 테스트 환경에서는 logging 비활성화
    };
};
