import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async findByUser(username: string, password?: string) {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user');

    queryBuilder.where('user.user_name = :user_name', { username });

    if (password) {
      queryBuilder.addSelect('user.user_pass');
    }

    const entity = queryBuilder.getOne();

    return entity;
  }

  async getByEmail(email: string) {
    return await this.userRepository.createQueryBuilder('user')
      .where('user.user_email = :user_email', { email })
      .getOne();
  }

  async create(
    payload: CreateUserDto,
  ) {
    const user = await this.getByEmail(payload.user_email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await this.userRepository.save(
      this.userRepository.create(payload),
    );
  }
}