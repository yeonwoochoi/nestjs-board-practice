import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {
  }

  getHello(): string {
    const dbHost = this.configService.get<string>('DB_HOST');
    console.log('DB_HOST:', dbHost);  // .env에서 DB_HOST가 잘 로드되는지 확인
    return `Hello World! DB_HOST: ${dbHost}`;
  }
}