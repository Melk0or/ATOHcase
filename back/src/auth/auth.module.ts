import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { CookiesService } from './cookies.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    global: true,
    signOptions: {expiresIn: '1d'},
  })],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookiesService]
})
export class AuthModule {}
