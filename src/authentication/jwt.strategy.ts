import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // This is in-secure because I am sharing my key in my code base
      // secretOrKey: process.env.JWT_SECRET, // This is the recommended way but requires everyone in the development team to have access to the key (create their .env file)
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      username: payload.username,
      //tenantId: payload.tenantId
    };
  }
}
