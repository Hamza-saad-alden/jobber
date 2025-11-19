import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/jobber-auth';
import { CreateUserInput } from './dto/create-user.input';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserInput: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: {
        ...createUserInput,
        password: await hash(createUserInput.password, 10),
      },
    });
  }

  async getUsers() {
    return await this.prismaService.user.findMany();
  }
}
