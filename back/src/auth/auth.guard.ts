import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { CookiesService } from './cookies.service';

type contextType = boolean | Promise<boolean> | Observable<boolean>;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): contextType {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookiesService.tokenKey];

    if (!token) {
      throw new UnauthorizedException({type: "session not found"});
    }

    try {
      const sessionInfo = this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });
      req['session'] = sessionInfo;
    } catch {
      throw new UnauthorizedException({type: "vere"});
    }
    return true;
  }
}
