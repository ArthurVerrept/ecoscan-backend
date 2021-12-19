import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
// import { GoogleAuthenticationService } from '../google-authentication/googleAuthentication.service'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import User from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    // @Inject(forwardRef(() => GoogleAuthenticationService))
    // private readonly _googleAuthenticationService: GoogleAuthenticationService,
    @InjectRepository(User) private usersRepository: Repository<User>
    ){}

  getAll(): Promise<User[]> {
    return this.usersRepository.find() // SELECT * from user
  }

  async getOneById(id: number): Promise<User> {
      return await this.usersRepository.findOneOrFail(id, { relations: ['reviews'] }) // SELECT * from user WHERE id = ?
  }

  async createWithGoogle(email: string, googleAccessToken: string, googleRefreshToken: string): Promise<User> {
    const newUser = await this.usersRepository.create({ 
      googleAccessToken,
      googleRefreshToken,
      email, 
      isCreatedWithGoogle: true 
    })

    // Saves a given entity in the database.
    // If entity does not exist in the database
    // then inserts, otherwise update
    return this.usersRepository.save(newUser) // INSERT
  }

  async getGoogleUser(id: number) {
    const user = await this.usersRepository.findOneOrFail({ id })

    console.log(user)

    // const googleUser = await this.googleAuthenticationService.getUserData(user.googleAccessToken)

    // return googleUser
  }

  async changeCurrentRefreshToken(userId: number, currentRefreshToken: string) {
    await this.usersRepository.update(userId, {
      currentRefreshToken
    })
    return
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // TODO: GENERATE PROPER ID
    const newUser = await this.usersRepository.create({ ...createUserDto })

    // Saves a given entity in the database.
    // If entity does not exist in the database
    // then inserts, otherwise update
    return this.usersRepository.save(newUser) // INSERT
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getOneById(userId)
 
    const isRefreshTokenMatching = (refreshToken === user.currentRefreshToken)
 
    if (isRefreshTokenMatching) {
      return user
    }
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
