import { Controller, Get, Request, Post, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserDto } from './users/dto/user.dto';
import { CreateUserDto } from './users/dto/register-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   console.log(req);
  //   return this.authService.login(req.user);
  // }

  @Post('/register')
  async register(@Body(ValidationPipe) user: CreateUserDto) {
    return this.authService.register(user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

}