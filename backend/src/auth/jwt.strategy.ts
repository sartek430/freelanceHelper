import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as fs from 'fs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secretOrKey = fs
      .readFileSync(
        `${process.cwd()}/dist/${configService.get<string>(
          'authentication.jwtOptions.publicKeyPath',
        )}`,
      )
      .toString();

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  async validate(payload: User) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
}
