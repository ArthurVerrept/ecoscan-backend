import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import User from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>){
  }

  getAll(): Promise<User[]> {
    return this.usersRepository.find() // SELECT * from user
  }

  async getOneById(id: number): Promise<User> {
      return await this.usersRepository.findOneOrFail(id) // SELECT * from user WHERE id = ?
  }

  async createWithGoogle(name: string, email:string): Promise<User> {
    // TODO: GENERATE PROPER ID
    const newUser = await this.usersRepository.create({ name, email, createdWithGoogle: true })

    // Saves a given entity in the database.
    // If entity does not exist in the database
    // then inserts, otherwise update
    return this.usersRepository.save(newUser) // INSERT
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
    let user = await this.getOneById(id)

    user = {
      id: id,
      ...user,
      ...updateUserDto
    }

    // Saves a given entity in the database.
    // If entity does not exist in the database
    // then inserts, otherwise update
    return this.usersRepository.save(user) // UPDATE
  }

  async getByEmail(email: string): Promise<User>  {
      const user = await this.usersRepository.findOne({ email })
      if (user) {
        return user
      }
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
  }
}
