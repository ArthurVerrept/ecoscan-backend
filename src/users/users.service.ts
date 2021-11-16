import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import User from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>){
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find() // SELECT * from user
  }

  async findOneById(id: number): Promise<User> {
      return await this.usersRepository.findOneOrFail(id) // SELECT * from user WHERE id = ?
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // TODO: GENERATE PROPER ID
    const newUser = await this.usersRepository.create({ ...createUserDto })

    // Saves a given entity in the database.
    // If entity does not exist in the database
    // then inserts, otherwise update
    return this.usersRepository.save(newUser) // INSERT
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.findOneById(id)

    user = {
      id: id,
      ...updateUserDto
    }

    // Saves a given entity in the database.
    // If entity does not exist in the database
    // then inserts, otherwise update
    return this.usersRepository.save(user) // UPDATE
  }
}
