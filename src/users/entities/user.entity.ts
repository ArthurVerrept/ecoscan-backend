import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class User {
    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id: string

    @Column()
    name: string

    @Column()
    picture: string

    @Column({ unique: true })
    email: string

    @Column({ default: false })
    isCreatedWithGoogle: boolean
}

export default User