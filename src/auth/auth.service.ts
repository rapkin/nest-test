import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import UserDto from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.findByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByNameId(username: string, id: number): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    if (user && user.name === username) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(registrationData: RegisterDto) {
    try {
      const { password, ...user } = await this.usersService.create(
        registrationData.name,
        registrationData.password,
      );
      return this.login(user);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
