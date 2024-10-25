import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { type Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Env } from '@common/config/env/validation-env';
import { JwtAuthPayload } from '@common/interfaces/JwtAuthPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService<Env>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtAuthPayload) {
    if (payload?.sub && payload?.company_id) {
      req.user = {
        id: payload.sub,
        company_id: payload.company_id,
      };
      return true;
    } else {
      return false;
    }
  }
}
