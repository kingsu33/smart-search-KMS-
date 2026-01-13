import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/sayHi")
  getSayHi(): string {
    return this.appService.getSayHi();
  }

  @Get('register')

  @Get('login')
  login(): string {
    return this.appService.login();
  }

  @Get('logout')
  logout(): string {
    return 'good bye! see u soon!!'
  }
}
