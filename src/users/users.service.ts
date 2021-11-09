import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import User from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>){
  }

  getAll(): Promise<User[]> {
    return this.usersRepository.find() // SELECT * from user
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne(id) // SELECT * from user WHERE id = ?
      return user
    } catch (err) {
      throw err
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create({ id: Date.now(), ...createUserDto })

    // Saves a given entity in the database.
    // If entity does not exist in the database
    // then inserts, otherwise update
    return this.usersRepository.save(newUser) // INSERT

  }

  async updateUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create({ id: Date.now(), ...createUserDto })

    // Saves a given entity in the database.
    // If entity does not exist in the database
    // then inserts, otherwise update
    return this.usersRepository.save(newUser) // INSERT

  }
}
