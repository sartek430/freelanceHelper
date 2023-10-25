import { Body, Controller, Post, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('login')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }
}
