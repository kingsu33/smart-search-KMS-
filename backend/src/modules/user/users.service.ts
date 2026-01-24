import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) { }

    findByEmail(email: string) {
        return this.userRepo.findByEmail(email);
    }

    findById(id: number) {
        return this.userRepo.findById(id);
    }

    createUser(email: string, password: string) {
        return this.userRepo.createUser({ email, password });
    }
}