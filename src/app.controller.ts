import { Controller, Get, Request, Post, UseGuards, Body, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/register-user.dto';
import { UsersService } from './users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid'

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "uploads/profile-images",
      filename: (req, file, cb) => {
        const fileName = path.parse(file.originalname).name.replace(/\s/g, "") + uuidv4();
        const extension = path.parse(file.originalname).ext
        cb(null, `${fileName}${extension}`)
      }
    })
  }))

  @UseGuards(JwtAuthGuard)
  uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    this.usersService.insertImg(req.user.email, file.destination)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.email);
  }

}