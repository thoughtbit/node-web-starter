import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UserEntity } from './user.entity';
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async findByUser(username: string, password?: boolean) {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user');
    queryBuilder.where('user.user_name = :username', { username });

    if (password) {
      queryBuilder.addSelect('user.user_pass');
    }

    const user = queryBuilder.getOne();

    return user;
  }

  async getUserByName (username: string) {
    const user = await this.userRepository.createQueryBuilder('user')
    .where('user.user_name = :username', { username })
    .getOne();

    if (!user) {
      throw new HttpException('没找到用户.', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user  = await this.userRepository.createQueryBuilder('user')
    .where('user.user_email = :email', { email })
    .getOne();

    if (!user) {
      throw new HttpException('没找到邮箱.', HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async getUserByEmailAndPass(email: string, password: string) {
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    return await this.userRepository.createQueryBuilder('users')
      .where('user.user_email = :email AND user.user_pass = :password')
      // .setParameter('email', email)
      // .setParameter('password', passHash)
      .setParameters({
        email,
        password: passHash
      })
      .getOne();
  }

  async create(payload: CreateUserDto) {
    const { user_name } = payload;
    const user = await this.userRepository.createQueryBuilder('user')
    .where('user.user_name = :username', { username: user_name })
    .getOne();

    if (user) {
      throw new HttpException('用户已经存在了.', HttpStatus.BAD_REQUEST)
    }

    return await this.userRepository.save(
      this.userRepository.create(payload),
    );
  }
}