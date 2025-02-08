import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { TestModule } from '../test/test.module';  // TestModule import
import { ConfigService } from '@nestjs/config';  // ConfigService import

describe('DatabaseService', () => {
  let databaseService: DatabaseService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],  // TestModule을 import하여 모든 설정을 자동으로 처리
    }).compile();

    databaseService = module.get<DatabaseService>(DatabaseService);
    configService = module.get<ConfigService>(ConfigService);  // ConfigService 주입
  });

  it('should be defined', () => {
    expect(databaseService).toBeDefined();
  });

  it('should load DB_HOST from .env', () => {
    const dbHost = configService.get('DB_HOST');  // ConfigService로 DB_HOST 값 가져오기
    expect(dbHost).toBe('localhost');  // DB_HOST 값이 'localhost'인지 확인
  });

  it('should return correct DB_HOST from service', () => {
    const result = databaseService.getHello();
    expect(result).toContain('DB_HOST: localhost');  // 서비스에서 반환된 결과에 DB_HOST 포함 여부 확인
  });
});
