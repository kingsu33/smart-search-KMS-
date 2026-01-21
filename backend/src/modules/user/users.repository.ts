import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    findById(id: string) {
        return this.prisma.user.findId({ where: { id } });
    }

    createUser(data: { email: string; password: string }) {
        return this.prisma.user.create({ data });
    }
}