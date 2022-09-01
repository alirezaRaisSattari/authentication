import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.gaurd';

@Controller()
export class AppController {

  @UseGuards(LocalAuthGuard)

  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}