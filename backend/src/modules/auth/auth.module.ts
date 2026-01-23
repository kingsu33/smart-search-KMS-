import { Module } from "@nestjs/common";
import { UsermModule } from "../user/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import JwtStre

@Module({
    imports: [
        UsermModule,
        PassportModule,
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})

export class AuthModule { }