import { Module } from "@nestjs/common"
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeORMConfig } from '../configs/typeorm.config';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule, // 환경 변수를 사용하기 위해 import만 하면 됨
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule을 import하여 ConfigService를 사용할 수 있게 설정
      inject: [ConfigService],  // ConfigService를 주입
      useFactory: typeORMConfig // 동적 설정을 위한 factory 메서드
    })
  ],
  providers: [DatabaseService]
})
export class DatabaseModule {}