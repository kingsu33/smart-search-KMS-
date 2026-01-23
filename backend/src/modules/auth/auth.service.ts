import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async register(email: string, password: string) {
        const exists = await this.userService.findByEmail(email);
        if (exists) throw new ConflictException("Email already in use");

        const hash = await bcrypt.hash(password, 12);
        const user = await this.userService.createUser(email, hash);

        return { id: user.id, email: user.email };
    }

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException("Invalid Credentials");

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) throw new UnauthorizedException("Invalid Credentials");

        return { id: user.id, email: user.email };
    }
}