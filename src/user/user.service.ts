import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    delete userData.password;

    return {
      message: 'User created successfully.',
      data: userData,
    };
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password.toString(), 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    delete updatedUser.password;

    return {
      message: 'User updated successfully.',
      data: updatedUser,
    };
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'User deleted successfully.',
    };
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async listUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const userList = await this.prisma.user.findMany({
      skip,
      take: Number(limit),
    });

    const totalCount = await this.prisma.user.count();
    userList.forEach((user) => delete user.password);

    return {
      message: 'User list fetched successfully.',
      data: userList,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials.');
    }

    return user;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return {
      message: 'User login successfully.',
      accessToken: this.jwtService.sign(payload),
    };
  }
}
