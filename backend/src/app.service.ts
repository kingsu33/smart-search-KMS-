import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSayHi(): string {
    return 'Say Hi!!!!!'
  }

  login(): string {
    return 'welcome!!'
  }
}
