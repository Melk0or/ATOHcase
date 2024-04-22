import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signUp(password: string, login: string, fullName: string) {
    const findUserLog = await this.userService.findByLogin(login);
    const findUserName = await this.userService.findByName(fullName);
    if (findUserLog || findUserName) {
      throw new BadRequestException({ type: 'login or name already exist' });
    }

    const salt = this.passwordService.generateSalt();

    const hash = this.passwordService.generateHash(password, salt);

    const newUser = await this.userService.createUser({
      login,
      fullName,
      hash,
      salt,
    });

    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      login: newUser.login,
      fullName: newUser.full_name,
    });

    return { accessToken };
  }

  async signIn(password: string ,login: string) {
    const user = await this.userService.findByLogin(login);

    if (!user) {
      throw new BadRequestException({ type: 'account dont exist' });
    }

    const hash = this.passwordService.generateHash(password, user.salt);

    if (hash !== user.hash) {
      throw new BadRequestException({ type: 'wrong password' });
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      login: user.login,
      fullName: user.full_name,
    });

    return { accessToken };
  }
}
