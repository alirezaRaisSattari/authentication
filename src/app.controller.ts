import { Controller, Get, Request, Post, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserDto } from './users/dto/user.dto';
import { CreateUserDto } from './users/dto/register-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private usersService: UsersService) { }

  @Post('/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @Post('/register')
  async register(@Body(ValidationPipe) user: CreateUserDto) {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.email);
  }

}