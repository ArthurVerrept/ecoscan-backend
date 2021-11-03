import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  private userArray: User[] = [{ id: 0, name: 'arthur' }]

  findAll(): User[] {
    return this.userArray
  }

  findById(id: number): User {
    return this.userArray.find(user => user.id === id)
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto }

    this.userArray.push(newUser)

    return newUser
  }
}
