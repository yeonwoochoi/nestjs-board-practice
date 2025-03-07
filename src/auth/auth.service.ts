import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {User} from "./user.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOne({where: {username}});

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = {username}; // username, email 등을 넣으면 됨. 다만 중요한 정보는 넣으면 안됨!!
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};

        } else {
            throw new UnauthorizedException('login failed');
        }
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
