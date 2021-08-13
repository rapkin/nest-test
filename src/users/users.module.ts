import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './users.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
