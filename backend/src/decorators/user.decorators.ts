import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface IUserInfos {
  id: number;
  username: string;
  email: string;
  jwt: string;
}

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const UserInfos = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (request.headers['x-access-token']) {
      return null;
    }

    const jwt = request.headers.authorization.startsWith('Bearer ')
      ? request.headers.authorization.slice(
          7,
          request.headers.authorization.length,
        )
      : request.headers.authorization;

    const payload = parseJwt(jwt);

    return {
      ...payload,
      jwt,
    };
  },
);

export { UserInfos, IUserInfos };
