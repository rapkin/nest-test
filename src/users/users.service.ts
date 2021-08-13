import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user)
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async findByName(name: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { name } });
    if (!user)
      throw new HttpException(
        'User with this name does not exist',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async create(name: string, password: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne({ where: { name } });
    if (foundUser)
      throw new HttpException(
        'User with this name already registered',
        HttpStatus.BAD_REQUEST,
      );
    const newUser = await this.usersRepository.create({ name, password });
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
