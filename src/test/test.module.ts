import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 ConfigService 사용 가능
      envFilePath: 'src/configs/env/.env.' + (process.env.NODE_ENV || 'development'), // 정확한 경로 지정
    }),
    DatabaseModule  // 데이터베이스 연결 모듈
  ],
})
export class TestModule {}
