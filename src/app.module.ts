import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // forRoot는 한번만 호출해야해서 일부러 app.module에서 호출
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 ConfigService 사용 가능
      envFilePath: 'src/configs/env/.env.' + (process.env.NODE_ENV || 'development'), // 정확한 경로 지정
    }),
    DatabaseModule,
    BoardsModule,
    AuthModule,
    // TestModule
  ]
})
export class AppModule {}
