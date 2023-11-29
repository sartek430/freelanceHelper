import { Module } from '@nestjs/common';
import * as fs from 'fs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const publicKey = fs
          .readFileSync(
            `${process.cwd()}/dist/${configService.get<string>(
              'authentication.jwtOptions.publicKeyPath',
            )}`,
          )
          .toString();

        const privateKey = {
          key: fs
            .readFileSync(
              `${process.cwd()}/dist/${configService.get<string>(
                'authentication.jwtOptions.privateKeyPath',
              )}`,
            )
            .toString(),
          passphrase: 'ZLzuQrtLvyyYmvi3uYWEgoFA',
        };

        return {
          publicKey,
          privateKey,
          signOptions: {
            expiresIn: configService.get<string>(
              'authentication.jwtOptions.expiresIn',
            ),
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
