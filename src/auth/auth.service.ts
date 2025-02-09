import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) { }

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }
}
