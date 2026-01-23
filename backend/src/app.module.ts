import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { PrismaModuls } from './database/prisma/prisma.module';
import { UsermModule } from './modules/user/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

  ],
  controllers: [PrismaModuls, UsermModule, AuthModule],
})
export class AppModule { }
