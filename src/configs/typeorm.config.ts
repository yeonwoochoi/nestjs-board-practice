import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config(); // .env 파일 로드

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true, // 자동으로 entities를 찾아서 로드함. -> 수동적으로 명시하고 싶으면 entities: [...] 속성 추가하면 됨.
    // synchronize: true는 개발 환경에서 테이블 구조를 자동으로 동기화함
    // 엔티티 클래스에 변경이 있으면 애플리케이션 실행 시 테이블에 자동으로 반영됨
    // 주의: 운영 환경에서는 synchronize: true를 사용하지 않는 것이 좋음
    // 데이터 손실이나 예기치 않은 구조 변경을 방지하기 위해, 운영 환경에서는 마이그레이션을 사용해야 함
    synchronize: true,
    logging: true
};