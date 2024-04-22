import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CookiesService } from './cookies.service';
import { Response } from 'express';
import { SessionInfoDto, SingInBodyDto, SingUpBodyDto } from 'dto/auth.dto';
import { SessionInfo } from './session-info.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookiesService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(
    @Body() body: SingUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(
      body.pasword,
      body.login,
      body.fullName,
    );

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SingInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(
      body.pasword,
      body.login,
    );

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session-info')
  @ApiOkResponse({
    type: SessionInfoDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: SessionInfoDto) {
    return session;
  }
}
