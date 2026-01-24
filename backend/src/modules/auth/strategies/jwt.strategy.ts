import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export type JwtPayload = {
    sub: string;
    email: string;
    iat?: number;
    epx?: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
        });
    }

    async validate(payload: JwtPayload) {
        if(!payload?.sub) throw new UnauthorizedException("Invalid token payload");

        return {
            userId: payload.sub,
            email: payload.email,
        };
    }
}