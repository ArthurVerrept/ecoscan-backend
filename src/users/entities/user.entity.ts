import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ default: false })
    isCreatedWithGoogle: boolean
}

export default User